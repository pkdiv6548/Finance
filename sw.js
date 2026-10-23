'use strict';
const CACHE='finance-static-v2';
const CORE=['./','./index.html','./transactions.html','./budgets.html','./goals.html','./bills.html','./reports.html','./settings.html','./accounts.html','./recurring.html','./subscriptions.html','./debts.html','./investments.html','./assets.html','./invoices.html','./watchlists.html','./rules.html','./categories.html','./reconciliation.html','./household.html','./refunds.html','./notifications.html','./profile.html','./security.html','./help.html','./forecasts.html','./calendar.html','./net-worth.html','./insights.html','./calculators.html','./tax-estimator.html','./assistant.html','./data.html','./css/styles.css','./js/app.js','./manifest.webmanifest','./assets/icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('finance-static-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
const req=event.request;
if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
event.respondWith(fetch(req).then(response=>{
if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy))}
return response;
}).catch(()=>caches.match(req).then(cached=>cached||(req.mode==='navigate'?caches.match('./index.html'):new Response('',{status:503,statusText:'Offline'}))));
});
