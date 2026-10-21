// Confirmation emails may redirect with Supabase tokens. This site uses server
// cookies instead. Remove the fragment before loading any other page scripts.
if(/(?:access_token|refresh_token|error_description)=/.test(location.hash)){
  history.replaceState(null,'',location.pathname+location.search);
}
