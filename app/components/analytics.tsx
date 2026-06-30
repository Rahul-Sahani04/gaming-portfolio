"use client";
import Script from "next/script";

// Minified tracker inline — no external CDN dependency.
// SITE_ID and ENDPOINT injected from env vars at build time.
const TRACKER = String.raw`(function(w,d,SITE_ID,ENDPOINT){function post(p){var data=JSON.stringify(p);try{if(w.navigator.sendBeacon){w.navigator.sendBeacon(ENDPOINT,new Blob([data],{type:"application/json"}))}else{fetch(ENDPOINT,{method:"POST",body:data,keepalive:true,headers:{"Content-Type":"application/json"}})}}catch(e){}}function getDevice(){var touch=w.navigator.maxTouchPoints>0;var sw=w.screen.width;if(touch)return sw>1024?"Tablet":"Mobile";return sw>=1366?"Desktop":"Laptop"}try{var sid=w.sessionStorage.getItem("_b");if(!sid){sid=w.crypto.randomUUID();w.sessionStorage.setItem("_b",sid)}var url=new URL(d.URL);var p={siteId:SITE_ID,type:"pageview",path:url.pathname,sessionId:sid,timestamp:Date.now(),device:getDevice()};if(d.title)p.title=d.title;if(d.referrer)p.referrer=d.referrer;if(w.navigator.language)p.locale=w.navigator.language;var utms=["source","medium","campaign","content","term"];for(var i=0;i<utms.length;i++){var v=url.searchParams.get("utm_"+utms[i]);if(v)p["utm"+utms[i][0].toUpperCase()+utms[i].slice(1)]=v}post(p)}catch(e){}w.beacon=function(name,data){try{var s=w.sessionStorage.getItem("_b")||"";post({siteId:SITE_ID,type:"custom",path:w.location.pathname,sessionId:s,timestamp:Date.now(),eventName:name,eventData:data||null})}catch(e){}}}(window,document,"__SITE_ID__","__ENDPOINT__"))`;

export function Analytics() {
  const siteId = process.env.NEXT_PUBLIC_BEACON_SITE_ID;
  const endpoint = process.env.NEXT_PUBLIC_BEACON_ENDPOINT;
  if (!siteId || !endpoint) return null;
  return (
    <Script id="beacon" strategy="afterInteractive">
      {TRACKER.replace("__SITE_ID__", siteId).replace("__ENDPOINT__", endpoint)}
    </Script>
  );
}
