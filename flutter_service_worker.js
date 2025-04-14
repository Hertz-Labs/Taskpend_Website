'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"adview.html": "b881443ef355bf91952482c3f4d4f0c3",
"assets/AssetManifest.bin": "1945002706159bdb466907bf0a1fd1c8",
"assets/AssetManifest.bin.json": "7cd8b5d85adb6a7befeadf7050125181",
"assets/AssetManifest.json": "2e6956b77547849e8554144f836e19a4",
"assets/assets/fonts/Akronim-Regular.ttf": "08683c515d3dc8b6f4dec817c8f8d006",
"assets/assets/hertz_labs_icon.png": "f717f833fc2e2ae438dbe7c2eb8c167b",
"assets/assets/sp_screen_hertz_labs_icon.png": "bd57da99fa5adafa5133dbe364924fb0",
"assets/assets/sp_screen_hertz_labs_icon_a12.png": "6188c60a8cdd1f8cb3e5a0087e6ee4a6",
"assets/assets/taskpend_icon.png": "823281cd5fa88434363170a2798b6950",
"assets/assets/taskpend_icon_a12.png": "03dfaacd9d12ac54bb3f3a48e9e054a1",
"assets/assets/taskpend_title_icon.png": "a32045958c0c47049b64b4eab748fee7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7c41ab8cb5173f6ad7fece92b18bd37b",
"assets/NOTICES": "3bb79d39345c0d743a442805b3770d7b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "6eebb2ab283ddfec6484400ed9c6a25f",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "ee313c013e8d1b5798eadafcfa34040c",
"icons/Icon-192.png": "e63bba9ecb6ef15589971b8f16efcd2f",
"icons/Icon-512.png": "9abbb810f86758c597a7444aef2d5042",
"icons/Icon-maskable-192.png": "e63bba9ecb6ef15589971b8f16efcd2f",
"icons/Icon-maskable-512.png": "9abbb810f86758c597a7444aef2d5042",
"index.html": "fcf983d03646349158661e2d8e6c9de6",
"/": "fcf983d03646349158661e2d8e6c9de6",
"main.dart.js": "aca5c1b569397590749403058b166307",
"manifest.json": "acb9b794c5c48fde34035b19a8fc18c2",
"splash/img/branding-1x.png": "3be0e6906cf74c0009db730b898fea3b",
"splash/img/branding-2x.png": "79fb18ebd03984cbb4a6c8746a5a9fad",
"splash/img/branding-3x.png": "4c7f50b129658e0f2870a3a525cc8203",
"splash/img/branding-4x.png": "d9469301a67bb812b6129a9310d0a0e2",
"splash/img/branding-dark-1x.png": "3be0e6906cf74c0009db730b898fea3b",
"splash/img/branding-dark-2x.png": "79fb18ebd03984cbb4a6c8746a5a9fad",
"splash/img/branding-dark-3x.png": "4c7f50b129658e0f2870a3a525cc8203",
"splash/img/branding-dark-4x.png": "d9469301a67bb812b6129a9310d0a0e2",
"splash/img/dark-1x.png": "fb7549194010711af76e59bd6fb12895",
"splash/img/dark-2x.png": "9abbb810f86758c597a7444aef2d5042",
"splash/img/dark-3x.png": "65b22548cbd7ca23b67803be8971d2f7",
"splash/img/dark-4x.png": "b23b9643295e349b04d500d6ac1c9848",
"splash/img/light-1x.png": "fb7549194010711af76e59bd6fb12895",
"splash/img/light-2x.png": "9abbb810f86758c597a7444aef2d5042",
"splash/img/light-3x.png": "65b22548cbd7ca23b67803be8971d2f7",
"splash/img/light-4x.png": "b23b9643295e349b04d500d6ac1c9848",
"version.json": "e61c558ee515952794d2d52e2e7f9500"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
