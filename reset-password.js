(() => {
  'use strict';
  const params=new URLSearchParams(location.hash.slice(1));
  let token=params.get('type')==='recovery'?params.get('access_token'):null;
  history.replaceState(null,'',location.pathname);
  document.addEventListener('DOMContentLoaded',()=>{
    const form=document.getElementById('resetForm'),button=document.getElementById('resetButton'),status=document.getElementById('resetStatus');
    if(!token){form.hidden=true;status.textContent='Bağlantı geçersiz veya süresi dolmuş. Giriş ekranından yeni bağlantı isteyin. / Please request a new reset link.';return;}
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(button.disabled)return;
      const password=document.getElementById('newPassword'),confirm=document.getElementById('confirmPassword');
      if(password.value!==confirm.value){status.textContent='Şifreler eşleşmiyor. / Passwords do not match.';return;}
      if(password.value.length<12||password.value.length>128){status.textContent='12–128 karakter kullanın. / Use 12–128 characters.';return;}
      button.disabled=true;status.textContent='Kaydediliyor… / Saving…';
      try{
        const response=await fetch('/api/app',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'resetPassword',payload:{accessToken:token,password:password.value}})});
        const data=await response.json();if(!response.ok)throw new Error(data.error||'Please try again.');
        token=null;form.reset();form.hidden=true;status.textContent=data.message;
      }catch(error){status.textContent=error.message;}finally{password.value='';confirm.value='';button.disabled=false;}
    });
  });
})();
