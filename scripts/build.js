import {mkdir,cp,rm} from 'node:fs/promises';
await rm('public',{recursive:true,force:true});
await mkdir('public');
for(const file of ['index.html','app.js','session-cleanup.js','reset-password.html','reset-password.js','app-ads.txt','logo-main.png','logo-ads.png','logo-voleybol.png','volleyball-quiz'])await cp(file,`public/${file}`,{recursive:true});

import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','styles.css','-o','public/styles.css','--minify'],{stdio:'inherit'});
