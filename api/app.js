import { createHash } from 'node:crypto';
import { AppError, text, syncUser, deadlineChecks, mutate, visibleState } from '../server/domain.js';
const COOKIE='__Host-pos_session';
function config(){
  const {SUPABASE_URL,SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,APP_ORIGIN,ADMIN_USER_ID}=process.env;
  if(!SUPABASE_URL||!SUPABASE_ANON_KEY||!SUPABASE_SERVICE_ROLE_KEY||!APP_ORIGIN||!ADMIN_USER_ID)throw new AppError('Account services are being configured. Please try again later.',503);
  if(new URL(SUPABASE_URL).protocol!=='https:'||new URL(APP_ORIGIN).origin!==APP_ORIGIN||!APP_ORIGIN.startsWith('https://'))throw new AppError('Service configuration error.',503);
  return {url:SUPABASE_URL.replace(/\/$/,''),anon:SUPABASE_ANON_KEY,secret:SUPABASE_SERVICE_ROLE_KEY,origin:APP_ORIGIN,admin:ADMIN_USER_ID};
}
async function remote(c,path,{method='GET',body,key=c.secret,bearer=key}={}){
  const r=await fetch(c.url+path,{method,headers:{apikey:key,Authorization:`Bearer ${bearer}`,'Content-Type':'application/json'},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(10000)});
  const data=await r.json().catch(()=>null);return {ok:r.ok,status:r.status,data};
}
async function db(c,path,body){const r=await remote(c,'/rest/v1/'+path,body===undefined?{}:{method:'POST',body});if(!r.ok)throw new AppError('Data service is unavailable.',503);return r.data;}
async function transaction(c,auth,action,payload){
  for(let attempt=0;attempt<5;attempt++){
    const rows=await db(c,'pos_private_state?id=eq.1&select=data,version');
    if(!rows?.[0])throw new AppError('Database setup is required.',503);
    const {data:s,version}=rows[0];
    deadlineChecks(s);
    const u=auth?syncUser(s,auth,c.admin):null;
    if(action!=='state'&&action!=='cron')mutate(s,u,action,payload);
    const saved=await db(c,'rpc/pos_compare_and_swap',{expected_version:version,next_data:s});
    if(saved)return {user:u,state:visibleState(s,u)};
  }
  throw new AppError('Another update is in progress. Please try again.',409);
}
async function rateLimit(c,req,action){
  const ip=String(req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
  const group=['login','register','requestPasswordReset','resetPassword'].includes(action)?action:'app';
  const key=createHash('sha256').update(c.secret+':'+ip+':'+group).digest('hex');
  const allowed=await db(c,'rpc/pos_rate_limit',{bucket_key:key,max_requests:group==='app'?180:group==='login'?10:5,window_seconds:group==='app'?60:900});
  if(!allowed)throw new AppError('Too many requests. Please try again later.',429);
}
function tokenFrom(req){return String(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);}
function cookie(res,token='',seconds=0){res.setHeader('Set-Cookie',`${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${Math.max(0,Math.min(seconds,3600))}`);}
async function verified(c,req){
  const token=tokenFrom(req);if(!token)return null;
  const r=await remote(c,'/auth/v1/user',{key:c.anon,bearer:token});
  if(!r.ok||!r.data?.id||!r.data?.email_confirmed_at)throw new AppError('Your session expired. Please log in again.',401);
  return r.data;
}
const actions=new Set(['state','submitSlot','createEvent','addVenue','approveSlot','rejectSlot','joinEvent','approveEvent','rejectEvent','finalizeEvent','cancelEvent']);
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  try{
    const c=config();
    if(req.method==='GET'){
      if(!process.env.CRON_SECRET||req.headers.authorization!==`Bearer ${process.env.CRON_SECRET}`)throw new AppError('Not authorized.',403);
      await transaction(c,null,'cron',{});return res.status(200).json({ok:true});
    }
    if(req.method!=='POST'){res.setHeader('Allow','POST');throw new AppError('Method not allowed.',405);}
    if(req.headers.origin!==c.origin)throw new AppError('Request origin is not allowed.',403);
    if(!String(req.headers['content-type']||'').startsWith('application/json'))throw new AppError('JSON required.',415);
    if(Number(req.headers['content-length']||0)>12000)throw new AppError('Request too large.',413);
    let body=req.body;
    if(typeof body==='string'){if(Buffer.byteLength(body)>12000)throw new AppError('Request too large.',413);try{body=JSON.parse(body);}catch{throw new AppError('Invalid JSON.');}}
    if(!body||typeof body!=='object'||Array.isArray(body)||Buffer.byteLength(JSON.stringify(body))>12000)throw new AppError('Invalid request.');
    const {action,payload={}}=body;
    if(!payload||typeof payload!=='object'||Array.isArray(payload))throw new AppError('Invalid payload.');
    await rateLimit(c,req,action);
    if(action==='requestPasswordReset'){
      const email=text(payload.email,254).toLowerCase();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new AppError('Invalid email.');
      // Use the configured root URL; root cleanup routes recovery tokens to the form.
      const r=await remote(c,'/auth/v1/recover?redirect_to='+encodeURIComponent(c.origin),{method:'POST',key:c.anon,body:{email}});
      if(r.status===429)throw new AppError('Çok fazla istek. Bir süre sonra tekrar deneyin. / Too many requests.',429);
      if(!r.ok&&r.status>=500)throw new AppError('Email service unavailable. Please try again later.',503);
      return res.status(200).json({message:'Hesap mevcutsa şifre yenileme bağlantısı gönderildi. Gelen kutusunu ve spam klasörünü kontrol edin. / If the account exists, a reset link has been sent.'});
    }
    if(action==='resetPassword'){
      const {accessToken,password}=payload;
      if(typeof accessToken!=='string'||accessToken.length<10||accessToken.length>8000)throw new AppError('Invalid or expired reset link.',400);
      if(typeof password!=='string'||password.length<12||password.length>128)throw new AppError('Şifre 12–128 karakter olmalı. / Use 12–128 characters.');
      const check=await remote(c,'/auth/v1/user',{key:c.anon,bearer:accessToken});
      if(!check.ok||!check.data?.id||!check.data?.email_confirmed_at)throw new AppError('Bağlantı geçersiz veya süresi dolmuş. Yeni bağlantı isteyin. / Invalid or expired link.',400);
      // The user's verified token authorizes the change; never use service_role here.
      const r=await remote(c,'/auth/v1/user',{method:'PUT',key:c.anon,bearer:accessToken,body:{password}});
      if(!r.ok)throw new AppError('Şifre değiştirilemedi. Farklı bir şifre veya yeni bağlantı deneyin. / Password could not be updated.',400);
      await remote(c,'/auth/v1/logout?scope=global',{method:'POST',key:c.anon,bearer:accessToken});
      cookie(res);
      return res.status(200).json({message:'Şifreniz yenilendi. Yeni şifrenizle giriş yapın. / Password updated. Please log in.'});
    }
    if(action==='login'||action==='register'){
      const email=text(payload.email,254).toLowerCase();
      if(typeof payload.password!=='string'||!payload.password.length||payload.password.length>128)throw new AppError('Invalid password.');
      const password=payload.password;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new AppError('Invalid email.');
      if(action==='register'){
        if(password.length<12)throw new AppError('Use a password of at least 12 characters.');
        const data={name:text(payload.name,80),phone:text(payload.phone,30),level:text(payload.level,30),sport:text(payload.sport,30)};
        const r=await remote(c,'/auth/v1/signup',{method:'POST',key:c.anon,body:{email,password,data}});
        if(!r.ok)throw new AppError('Registration could not be completed. Please try again later.',400);
        // Require confirmed-email login even if the Auth project's confirmation setting was disabled.
        return res.status(200).json({message:'Check your email to confirm your account, then log in. If the account already exists, use Login.'});
      }
      const r=await remote(c,'/auth/v1/token?grant_type=password',{method:'POST',key:c.anon,body:{email,password}});
      if(!r.ok||!r.data?.access_token||!r.data?.user?.email_confirmed_at)throw new AppError('Email or password is incorrect, or email has not been verified.',401);
      const result=await transaction(c,r.data.user,'state',{});
      cookie(res,r.data.access_token,Number(r.data.expires_in)||3600);
      return res.status(200).json(result);
    }
    if(action==='logout'){
      const token=tokenFrom(req);cookie(res);
      if(token)await remote(c,'/auth/v1/logout?scope=local',{method:'POST',key:c.anon,bearer:token});
      return res.status(200).json({ok:true});
    }
    if(!actions.has(action))throw new AppError('Unknown action.');
    const user=await verified(c,req);
    if(action!=='state'&&!user)throw new AppError('Please log in.',401);
    return res.status(200).json(await transaction(c,user,action,payload));
  }catch(e){
    const status=e instanceof AppError?e.status:503;
    if(status===401)cookie(res);
    return res.status(status).json({error:e instanceof AppError?e.message:'Service unavailable. Please try again later.'});
  }
}
