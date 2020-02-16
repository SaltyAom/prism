self.__precacheManifest = [
  {
    "url": "/_next/static/5GB4N0nMPFUdFxt3Sr37J/_buildManifest.js",
    "revision": "fb96ae7926f5104f50f0cf1b3a23a9b5"
  },
  {
    "url": "/_next/static/5GB4N0nMPFUdFxt3Sr37J/pages/_app.js",
    "revision": "0b02d835bcaccce2ef8e"
  },
  {
    "url": "/_next/static/5GB4N0nMPFUdFxt3Sr37J/pages/_error.js",
    "revision": "5e9c41fccc6c0ef730a9"
  },
  {
    "url": "/_next/static/5GB4N0nMPFUdFxt3Sr37J/pages/index.js",
    "revision": "633c1d40b8edc63141f5"
  },
  {
    "url": "/_next/static/chunks/ce57d68618e21d852dc1df820256f1082f177531.ff3d6454a4bb8ad5573c.js",
    "revision": "4890527b01a56125c6be"
  },
  {
    "url": "/_next/static/chunks/commons.9e454fb3e2ba5a253825.js",
    "revision": "8c1d93cd3bcc76554513"
  },
  {
    "url": "/_next/static/chunks/styles.7da3c169ac0a6b20002e.js",
    "revision": "2a1d125faa457040b5e0"
  },
  {
    "url": "/_next/static/css/styles.92984326.chunk.css",
    "revision": "2a1d125faa457040b5e0"
  },
  {
    "url": "/_next/static/runtime/main-3ce6fb692552563978a5.js",
    "revision": "5731b193b13c08be5e79"
  },
  {
    "url": "/_next/static/runtime/polyfills-bc8ad8c62b2d8fd595fb.js",
    "revision": "e299497469251819583d"
  },
  {
    "url": "/_next/static/runtime/webpack-2dafc8058821cf630788.js",
    "revision": "96035b09135e3adf95f4"
  }
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.js$|.ttf$|.otf$|.css$|.svg$|.jpg$|.png$/, new workbox.strategies.CacheFirst(), 'GET');
