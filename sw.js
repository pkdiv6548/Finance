'use strict';
const CACHE='finance-static-v5';
const CORE=['./','./index.html','./transactions.html','./budgets.html','./goals.html','./bills.html','./reports.html','./settings.html','./accounts.html','./recurring.html','./subscriptions.html','./debts.html','./investments.html','./assets.html','./invoices.html','./watchlists.html','./rules.html','./categories.html','./reconciliation.html','./household.html','./refunds.html','./notifications.html','./profile.html','./security.html','./help.html','./forecasts.html','./calendar.html','./net-worth.html','./insights.html','./calculators.html','./tax-estimator.html','./assistant.html','./data.html','./css/styles.css','./js/app.js','./manifest.webmanifest','./assets/icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('finance-static-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
const req=event.request;
if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
event.respondWith((async()=>{
try{
const response=await fetch(req);
if(response.ok){const cache=await caches.open(CACHE);await cache.put(req,response.clone())}
return response;
}catch{
const cached=await caches.match(req);
if(cached)return cached;
if(req.mode==='navigate')return (await caches.match('./index.html'))||new Response('Offline',{status:503,statusText:'Offline'});
return new Response('Offline',{status:503,statusText:'Offline'});
}
})());
});
