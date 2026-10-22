import { randomUUID } from 'node:crypto';
export class AppError extends Error { constructor(message,status=400){super(message);this.status=status;} }
export const emptyState=()=>({users:[],venues:[],slots:[],events:[],notifications:[]});
const fail=(message,status=400)=>{throw new AppError(message,status);};
const id=prefix=>`${prefix}_${randomUUID()}`;
const now=()=>new Date().toISOString();
export function text(value,max,required=true){
  if(typeof value!=='string'||value.length>max|| (required&&!value.trim()))fail('Invalid input.');
  return value.trim();
}
const integer=(n,min,max)=>{if(!Number.isInteger(n)||n<min||n>max)fail('Invalid player count.');return n;};
const choice=(v,items)=>items.includes(v)?v:fail('Invalid selection.');
const sports=['Volleyball','Football','Basketball','Badminton','Tennis','Other'];
const levels=['Beginner','Intermediate','Good','Advanced','Mixed'];
export function slotStart(slot){return Date.parse(slot.startsAt);}
const beforeDeadline=slot=>{if(!slot||!Number.isFinite(slotStart(slot))||slotStart(slot)-Date.now()<48*36e5)fail('This action must be completed at least 48 hours before the event.');};
const role=(user,roles)=>{if(!user||!roles.includes(user.role))fail('Not authorized.',403);};
const find=(items,key)=>items.find(x=>x.id===key)||fail('Not found.',404);
function notify(s,recipients,title,message){
  for(const userId of new Set(recipients.filter(Boolean)))s.notifications.unshift({id:id('n'),userId,title,text:message,createdAt:now(),read:false});
  s.notifications=s.notifications.slice(0,2000);
}
const admins=s=>s.users.filter(u=>u.role==='admin').map(u=>u.id);
function final(s,e){e.status='finalized';e.instruction2=true;e.finalizedAt=now();const slot=find(s.slots,e.slotId);slot.status='confirmed';notify(s,[...admins(s),e.creatorId,...e.participants,find(s.venues,slot.venueId).managerUserId],e.title,'Final instruction is ready.');}
export function deadlineChecks(s){
  let changed=false;
  for(const e of s.events){
    if(!['pending_admin','published'].includes(e.status))continue;
    const slot=find(s.slots,e.slotId);
    if(slotStart(slot)-Date.now()>48*36e5)continue;
    if(e.status==='published'&&e.participants.length>=e.minPlayers&&slotStart(slot)>Date.now())final(s,e);
    else {e.status='cancelled';slot.status='cancelled';notify(s,[...admins(s),e.creatorId,...e.participants],e.title,'Event cancelled: the approval or attendance deadline was missed.');}
    changed=true;
  }
  return changed;
}
export function syncUser(s,authUser,adminId){
  // Ignore roles in user-editable Supabase user_metadata.
  let u=s.users.find(x=>x.id===authUser.id);
  if(!u){
    const m=authUser.user_metadata||{};
    u={id:authUser.id,email:authUser.email,name:typeof m.name==='string'?m.name.slice(0,80):'Player',phone:typeof m.phone==='string'?m.phone.slice(0,30):'',level:levels.includes(m.level)?m.level:'Beginner',sport:sports.includes(m.sport)?m.sport:'Volleyball',role:'user'};
    s.users.push(u);
  }
  u.email=authUser.email;
  if(u.id===adminId)u.role='admin';
  else if(u.role==='admin')u.role='user';
  return u;
}
export function mutate(s,user,action,p={}){
  if(!p||typeof p!=='object'||Array.isArray(p))fail('Invalid payload.');
  if(action==='addVenue'){
    role(user,['admin']);
    const email=text(p.email,254).toLowerCase();
    const manager=s.users.find(u=>u.email.toLowerCase()===email);
    if(!manager||manager.role!=='user')fail('The manager must first register, verify their email and log in.');
    const v={id:id('venue'),name:text(p.name,120),address:text(p.address,240),managerUserId:manager.id,contactName:manager.name,contactPhone:manager.phone,sports:[],active:true};
    manager.role='venue';manager.venueId=v.id;s.venues.push(v);return;
  }
  if(action==='submitSlot'){
    role(user,['venue']);const v=find(s.venues,user.venueId);
    if(!v.active||v.managerUserId!==user.id)fail('Not authorized.',403);
    const date=text(p.date,10),start=text(p.start,5),end=text(p.end,5);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||![start,end].every(t=>/^([01]\d|2[0-3]):[0-5]\d$/.test(t))||start>=end)fail('Invalid date or time range.');
    // Client supplies ISO instants with Europe/London DST already resolved; verify them again here.
    const startsAt=text(p.startsAt,30),endsAt=text(p.endsAt,30);
    const dt=new Date(startsAt),et=new Date(endsAt);
    const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
    const local=d=>{if(!Number.isFinite(d.getTime()))fail('Invalid date.');const q=Object.fromEntries(fmt.formatToParts(d).map(x=>[x.type,x.value]));return `${q.year}-${q.month}-${q.day}T${q.hour}:${q.minute}`;};
    if(local(dt)!==`${date}T${start}`||local(et)!==`${date}T${end}`||dt>=et)fail('Invalid London time.');
    if(typeof p.fee!=='number'||!Number.isFinite(p.fee)||p.fee<0||p.fee>10000||Math.abs(p.fee*100-Math.round(p.fee*100))>1e-6)fail('Invalid fee.');
    const slot={id:id('slot'),venueId:v.id,date,start,end,startsAt:dt.toISOString(),endsAt:et.toISOString(),sport:choice(p.sport,sports),fee:p.fee,note:text(p.note,300,false),status:'pending',createdBy:user.id,createdAt:now()};beforeDeadline(slot);
    if(s.slots.some(x=>x.venueId===v.id&&!['rejected','cancelled'].includes(x.status)&&Date.parse(x.startsAt)<et.getTime()&&Date.parse(x.endsAt)>dt.getTime()))fail('The venue already has an overlapping slot.',409);
    s.slots.push(slot);notify(s,admins(s),v.name,'New venue slot awaiting approval.');return;
  }
  if(action==='createEvent'){
    role(user,['user','admin']);const slot=find(s.slots,p.slotId);beforeDeadline(slot);
    if(slot.status!=='approved')fail('Slot is no longer available.',409);
    const min=integer(p.minPlayers,2,40),max=integer(p.maxPlayers,min,40);
    const e={id:id('event'),title:text(p.title,80),description:text(p.description,300,false),sport:slot.sport,slotId:slot.id,creatorId:user.id,level:choice(p.level,levels),gender:choice(p.gender,['Mixed','Women','Men']),minPlayers:min,maxPlayers:max,status:user.role==='admin'?'published':'pending_admin',participants:user.role==='user'?[user.id]:[],createdAt:now(),instruction1:user.role==='admin',instruction2:false};
    s.events.push(e);slot.status=e.status==='published'?'reserved':'held';notify(s,admins(s),e.title,'New event request.');return;
  }
  if(action==='approveSlot'||action==='rejectSlot'){
    role(user,['admin']);const slot=find(s.slots,p.id);
    if(slot.status!=='pending')fail('Slot has already been processed.',409);
    if(action==='approveSlot')beforeDeadline(slot);
    slot.status=action==='approveSlot'?'approved':'rejected';notify(s,[slot.createdBy],'Venue slot',slot.status);return;
  }
  role(user,action==='joinEvent'?['user']:['admin']);
  const e=find(s.events,p.id),slot=find(s.slots,e.slotId);
  if(action==='joinEvent'){
    beforeDeadline(slot);if(e.status!=='published')fail('Event is not open for joining.',409);
    if(e.participants.includes(user.id))fail('Already joined.',409);
    if(e.participants.length>=e.maxPlayers)fail('Event is full.',409);
    e.participants.push(user.id);notify(s,[e.creatorId],e.title,'A player joined the event.');
    if(e.participants.length===e.maxPlayers)final(s,e);return;
  }
  if(action==='approveEvent'){
    beforeDeadline(slot);if(e.status!=='pending_admin'||slot.status!=='held')fail('Invalid event transition.',409);
    e.status='published';e.instruction1=true;e.approvedAt=now();slot.status='reserved';notify(s,[e.creatorId],e.title,'Event approved.');return;
  }
  if(action==='rejectEvent'){
    if(e.status!=='pending_admin'||slot.status!=='held')fail('Invalid event transition.',409);
    e.status='rejected';slot.status=slotStart(slot)-Date.now()>=48*36e5?'approved':'cancelled';notify(s,[e.creatorId],e.title,'Event rejected.');return;
  }
  if(action==='finalizeEvent'){
    beforeDeadline(slot);if(e.status!=='published'||e.participants.length<e.minPlayers)fail('Event cannot be finalized.',409);final(s,e);return;
  }
  if(action==='cancelEvent'){
    if(!['pending_admin','published','finalized'].includes(e.status))fail('Invalid event transition.',409);
    e.status='cancelled';slot.status=slotStart(slot)-Date.now()>=48*36e5?'approved':'cancelled';notify(s,[e.creatorId,...e.participants,find(s.venues,slot.venueId).managerUserId],e.title,'Event cancelled.');return;
  }
  fail('Unknown action.');
}
export function visibleState(s,u){
  if(u?.role==='admin')return structuredClone(s);
  const owns=e=>u&&(e.creatorId===u.id||e.participants.includes(u.id)|| (u.role==='venue'&&s.slots.some(x=>x.id===e.slotId&&x.venueId===u.venueId)));
  const events=s.events.filter(e=>['published','finalized'].includes(e.status)||owns(e)).map(e=>{
    if(owns(e))return structuredClone(e);
    // Keep counts without publishing participant IDs or names.
    return {...e,participants:e.participants.map((_,i)=>`private_${i}`),instruction1:false,instruction2:false};
  });
  const relevant=new Set(events.map(e=>e.slotId));
  const slots=s.slots.filter(x=>x.status==='approved'||relevant.has(x.id)||(u?.role==='venue'&&x.venueId===u.venueId));
  const venueIds=new Set(slots.map(x=>x.venueId));
  const venues=s.venues.filter(v=>v.active||venueIds.has(v.id)||v.id===u?.venueId).map(v=>{
    const privateAccess=u&&(u.venueId===v.id||events.some(e=>owns(e)&&s.slots.some(x=>x.id===e.slotId&&x.venueId===v.id)));
    return privateAccess?{...v}:{id:v.id,name:v.name,address:v.address,active:v.active,sports:v.sports};
  });
  const people=new Set([u?.id]);for(const e of events){people.add(e.creatorId);if(owns(e))e.participants.forEach(x=>people.add(x));}
  const users=s.users.filter(x=>people.has(x.id)).map(x=>x.id===u?.id?{...x}:{id:x.id,name:x.name});
  return {users,venues,slots,events,notifications:u?s.notifications.filter(n=>n.userId===u.id):[]};
}
