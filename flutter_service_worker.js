'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "3c2b2a2b53d654716ffa77128636c81a",
"index.html": "84b4aef09d176c43a4d1c03b4196c5e2",
"/": "84b4aef09d176c43a4d1c03b4196c5e2",
"main.dart.js": "f050679856bc9382099f2cd1f14ca9f1",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "304600a5bbe709068f35e7687341b1ed",
"assets/AssetManifest.json": "65b87ff6a05a89be30f24e6796f5b703",
"assets/NOTICES": "2bfa78d4858008ce9cf569d553d1d3fb",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/trenddown.png": "1d168fd295a5c408056bf98059f22b5d",
"assets/assets/images/record.png": "6cfa93c8ee7379f7e0596bdcffb9a696",
"assets/assets/images/chat2.png": "1ee8ef2f296501e20562904d3cb83c0d",
"assets/assets/images/No.png": "4aeb83c39475f1d5eac571a3ffc4cffe",
"assets/assets/images/dark.png": "e0908796d51d2077ecc5ca02f39a0cb1",
"assets/assets/images/best2.png": "4f7012f0d6b8734e7e1c907304d53c48",
"assets/assets/images/best1.png": "21e0f6f5a6009f57f04b35a4db776618",
"assets/assets/images/file.png": "1d30b7b49a460573bbfc718c007ceef5",
"assets/assets/images/chart.png": "afb732c7aa2921f2c0a85184fc6e4a49",
"assets/assets/images/notif.png": "64abc728269ea744bdfedc22f2b20a20",
"assets/assets/images/Yes.png": "b00739d755e6f53c878bd1cf6e98ccc2",
"assets/assets/images/bag.svg": "20683d5e99bbb26178a16f2d063df090",
"assets/assets/images/tiktok.png": "3c3e2e8e300a77231eb12632be6c605d",
"assets/assets/images/trendup.png": "e2180d3037ef2b94125a5145a9bb9412",
"assets/assets/images/rec_play.png": "923412f99b05d23426057b4a3ac9af91",
"assets/assets/images/coin.svg": "def8272a20fa2db343cc4c6333104f9e",
"assets/assets/images/logo.png": "3adf240289d05352da53a1736265e815",
"assets/assets/images/twitter.png": "76d481953b3aa32494825ed5007b7bfb",
"assets/assets/images/dollar-square.svg": "6c8fd9cba0c3f7b399512867e274a4e0",
"assets/assets/images/profile.png": "bdcbb1a67a360712f9ebb0846b1ad31c",
"assets/assets/images/sun.png": "66f359160f260286f503665d647e86e7",
"assets/assets/images/noti.png": "796c1e447fbea65ba5290c43ec725273",
"assets/assets/images/chat_image.png": "6a7ce920e576a14ccccc93afbd7d35c0",
"assets/assets/images/google.png": "a008234be867e6cb67e3b3d470663111",
"assets/assets/images/profile2.png": "edbbaa20e4e63a7baa5d0fc1a1f15a3c",
"assets/assets/images/chat.png": "97c243ea9e2a75a15fdee443093afe07",
"assets/assets/images/perf.png": "ca6e0bc324b3537f1793bf6630cc71b4",
"assets/assets/images/messages.png": "7a4cafe85aa5f4b22ce5e9fcefaf373b",
"assets/assets/images/arrow_down.png": "5f5354f0333fb92852b9aea70fc4da33",
"assets/assets/images/play.png": "871910560546d8a18e63e9bafee814f4",
"assets/assets/images/chat_image3.png": "3ce6fd0591a5da71d33fba2dea53ae16",
"assets/assets/images/inst.png": "1fc13f832c5d04d7077cba84c14790d6",
"assets/assets/images/chat_image2.png": "fe4dc4be70ac644cc6c8d62c219f107a",
"assets/assets/json/sales.json": "b25ae176b1090bfc73130126316a213a",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
