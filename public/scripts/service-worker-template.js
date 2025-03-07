self.addEventListener('install', function (event) {
    event.waitUntil(preLoad());
});

var filesToCache = [
    ...__VITE_BUILD_FILES__,
    '../offline.html',
    '../images/icons/icon-72x72.png',
    '../images/icons/icon-96x96.png',
    '../images/icons/icon-128x128.png',
    '../images/icons/icon-144x144.png',
    '../images/icons/icon-152x152.png',
    '../images/icons/icon-192x192.png',
    '../images/icons/icon-384x384.png',
    '../images/icons/icon-512x512.png',
];

var preLoad = async function () {
    const cache = await caches.open('offline');
    return await cache.addAll(filesToCache);
};

self.addEventListener('fetch', function (event) {
    event.respondWith(
        checkResponse(event.request).catch(function () {
            return returnFromCache(event.request);
        }),
    );
    event.waitUntil(addToCache(event.request));
});

var checkResponse = function (request) {
    return new Promise(function (fulfill, reject) {
        fetch(request).then(function (response) {
            if (response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

var addToCache = async function (request) {
    const cache = await caches.open('offline');
    const response = await fetch(request);
    return await cache.put(request, response);
};

var returnFromCache = async function (request) {
    const cache = await caches.open('offline');
    const matching = await cache.match(request);
    if (!matching || matching.status == 404) {
        return cache.match('offline.html');
    } else {
        return matching;
    }
};
