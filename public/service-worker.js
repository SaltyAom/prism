try{self["workbox:core:5.0.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.0.0"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class r extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const i=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href};class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;let n,{params:r,route:i}=this.findMatchingRoute({url:s,request:e,event:t}),c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{n=c.handle({url:s,request:e,event:t,params:r})}catch(e){n=Promise.reject(e)}return n instanceof Promise&&this.i&&(n=n.catch(n=>this.i.handle({url:s,request:e,event:t}))),n}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const r of n){let n,i=r.match({url:e,request:t,event:s});if(i)return n=i,Array.isArray(i)&&0===i.length?n=void 0:i.constructor===Object&&0===Object.keys(i).length?n=void 0:"boolean"==typeof i&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let a;const o=()=>(a||(a=new c,a.addFetchListener(),a.addCacheListener()),a);const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||f(u.precache),l=e=>e||f(u.runtime),d=new Set;const w=(e,t)=>e.filter(e=>t in e),p=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const i=await self.caches.open(e),c=await g({plugins:r,request:t,mode:"read"});let a=await i.match(c,n);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;a=await r.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:a,request:c})}return a},y=async({request:e,response:t,event:s,plugins:n=[]})=>{let r=t,i=!1;for(let t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(r=await n.call(t,{request:e,response:r,event:s}),!r)break}return i||(r=r&&200===r.status?r:void 0),r||null},g=async({request:e,mode:t,plugins:s=[]})=>{const n=w(s,"cacheKeyWillBeUsed");let r=e;for(const e of n)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},b={put:async({cacheName:e,request:s,response:n,event:r,plugins:c=[],matchOptions:a})=>{const o=await g({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:i(o.url)});let u=await y({event:r,plugins:c,response:n,request:o});if(!u)return;const f=await self.caches.open(e),h=w(c,"cacheDidUpdate");let l=h.length>0?await p({cacheName:e,matchOptions:a,request:o}):null;try{await f.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(let t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:r,oldResponse:l,newResponse:u,request:o})},match:p},v=async({request:e,fetchOptions:s,event:n,plugins:r=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=w(r,"fetchDidFail"),c=i.length>0?e.clone():null;try{for(let t of r)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}let a=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of r)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:a,response:t}));return t}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:a.clone()});throw e}};try{self["workbox:strategies:5.0.0"]&&_()}catch(e){}let m;async function R(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=t?t(n):n,i=function(){if(void 0===m){const e=new Response("");if("body"in e)try{new Response(e.body),m=!0}catch(e){m=!1}m=!1}return m}()?s.body:await s.blob();return new Response(i,r)}try{self["workbox:precaching:5.0.0"]&&_()}catch(e){}function q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const r=new URL(n,location.href),i=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",s),{cacheKey:r.href,url:i.href}}class x{constructor(e){this.o=h(e),this.u=new Map,this.h=new Map,this.l=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:r}=q(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.u.has(r)&&this.u.get(r)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.u.get(r),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.l.has(e)&&this.l.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:r});this.l.set(e,n.integrity)}if(this.u.set(r,e),this.h.set(r,i),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],r=await self.caches.open(this.o),i=await r.keys(),c=new Set(i.map(e=>e.url));for(const[e,t]of this.u)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const a=s.map(({cacheKey:s,url:n})=>{const r=this.l.get(s),i=this.h.get(n);return this.p({cacheKey:s,cacheMode:i,event:e,integrity:r,plugins:t,url:n})});return await Promise.all(a),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.o),t=await e.keys(),s=new Set(this.u.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}async p({cacheKey:e,url:s,cacheMode:n,event:r,plugins:i,integrity:c}){const a=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,u=await v({event:r,plugins:i,request:a});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:r,request:a,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await R(u)),await b.put({event:r,plugins:i,response:u,request:e===s?a:new Request(e),cacheName:this.o,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.u}getCachedURLs(){return[...this.u.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.u.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.o)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.o,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),r=new Request(e);return()=>n({request:r})}}let U;const L=()=>(U||(U=new x),U);const j=(e,t)=>{const s=L().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:r}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let T=!1;function N(e){T||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const r=h();self.addEventListener("fetch",i=>{const c=j(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let a=self.caches.open(r).then(e=>e.match(c)).then(e=>e||fetch(c));i.respondWith(a)})})(e),T=!0)}const O=[],E={get:()=>O,add(e){O.push(...e)}},K=e=>{const t=L(),s=E.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},W=e=>{const t=L();e.waitUntil(t.activate())};var k;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),k={},function(e){L().addToCacheList(e),e.length>0&&(self.addEventListener("install",K),self.addEventListener("activate",W))}([{url:"_next/static/WBbWExKX32RTuTh5JOgyw/_buildManifest.js",revision:"5fd35411ce3d1a43676c46e1e314a7cf"},{url:"_next/static/WBbWExKX32RTuTh5JOgyw/pages/_app.js",revision:"96119d0d8d8b23799aaaa1c77eb7902e"},{url:"_next/static/WBbWExKX32RTuTh5JOgyw/pages/_error.js",revision:"8b88c5936c5a7bd218134643cc7390c6"},{url:"_next/static/WBbWExKX32RTuTh5JOgyw/pages/index.js",revision:"fbf8ebda8e9a050662ebf487bee92482"},{url:"_next/static/chunks/14.87dca65acdf59b01a795.js",revision:"53278e7d8d781cdf4f7c0a84825e30d3"},{url:"_next/static/chunks/15.275a1a369f65410d35eb.js",revision:"1a8a299f35e49fb17f366904a7accaa4"},{url:"_next/static/chunks/a5d9a5d5f83c3fec63ffe51aa4cfac95aed55583.90c6595f2a93eb33fca9.js",revision:"05faff6c8f81eabd82c8ab01b704de28"},{url:"_next/static/chunks/commons.253a4b87d4f177b3cee1.js",revision:"bb687c1ac1c85a955ff7035e9e1c847e"},{url:"_next/static/chunks/framework.d88344b5046e2c997bb9.js",revision:"8b6d95a6b69ecf6cb5a449f7d0a15845"},{url:"_next/static/chunks/styles.44d64df1f98608c68da9.js",revision:"fff98d23c66f0e66e920a9f6e091324a"},{url:"_next/static/css/styles.84c842ac.chunk.css",revision:"42f14b9bca10f2bf90a11b93fa4970b3"},{url:"_next/static/runtime/main-63c635feef4b8a18941b.js",revision:"f81452e4ed5da33f96f566fbe2b3bfa5"},{url:"_next/static/runtime/polyfills-bc8ad8c62b2d8fd595fb.js",revision:"56e3060733afca0968c5d12e603df48e"},{url:"_next/static/runtime/webpack-8d1c3071add2149c8f75.js",revision:"c11752461d9dc4ecf6018cb571856c4c"}]),N(k),function(e,s,i){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,i)}else if(e instanceof RegExp)c=new r(e,s,i);else if("function"==typeof e)c=new n(e,s,i);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/.js$|.css$|.svg$|.jpg$|.png$/,new class{constructor(e={}){this.o=l(e.cacheName),this.g=e.plugins||[],this.v=e.fetchOptions,this.m=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,r=await b.match({cacheName:this.o,request:s,event:e,matchOptions:this.m,plugins:this.g});if(!r)try{r=await this.R(s,e)}catch(e){n=e}if(!r)throw new t("no-response",{url:s.url,error:n});return r}async R(e,t){const s=await v({request:e,event:t,fetchOptions:this.v,plugins:this.g}),n=s.clone(),r=b.put({cacheName:this.o,request:e,response:n,event:t,plugins:this.g});if(t)try{t.waitUntil(r)}catch(e){}return s}},"GET");
