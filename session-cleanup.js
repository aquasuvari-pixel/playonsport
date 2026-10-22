// No tokens are persisted in browser storage. Recovery tokens travel only in a
// fragment to the dedicated form; all other auth fragments are discarded.
(() => {
  const fragment=location.hash;
  const params=new URLSearchParams(fragment.slice(1));
  if (/(?:access_token|refresh_token|error_description)=/.test(fragment)) {
    history.replaceState(null,'',location.pathname+location.search);
    if(params.get('type')==='recovery' && params.get('access_token')) {
      location.replace('/reset-password.html'+fragment);
    }
  }
})();
