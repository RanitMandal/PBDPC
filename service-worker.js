/* ==========================================================
   PBDPC
   Progressive Web App - Service Worker
   Version: 1.0.0
========================================================== */

"use strict";

/* ==========================================================
   CONFIGURATION
========================================================== */

const CACHE_VERSION = "pbdpc-v1.0.0";

const BASE_PATH = "/PBDPC/";

const CACHE_NAME = CACHE_VERSION;


/* ==========================================================
   FILES TO CACHE
========================================================== */

const STATIC_ASSETS = [

    BASE_PATH,

    BASE_PATH + "index.html",

    BASE_PATH + "about.html",
    BASE_PATH + "history.html",
    BASE_PATH + "temple.html",
    BASE_PATH + "gallery.html",
    BASE_PATH + "sponsors.html",
    BASE_PATH + "contact.html",

    BASE_PATH + "components/header.html",
    BASE_PATH + "components/footer.html",
    BASE_PATH + "components/announcement.html",

    BASE_PATH + "assets/css/style.css",

    BASE_PATH + "assets/js/config.js",
    BASE_PATH + "assets/js/components.js",
    BASE_PATH + "assets/js/app.js",

    BASE_PATH + "manifest.json"

];


/* ==========================================================
   INSTALL
========================================================== */

self.addEventListener("install", event => {

    console.log("[PBDPC SW] Installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(STATIC_ASSETS);

            })

            .then(() => {

                console.log("[PBDPC SW] Static assets cached.");

                return self.skipWaiting();

            })

            .catch(error => {

                console.error(
                    "[PBDPC SW] Cache installation failed:",
                    error
                );

            })

    );

});


/* ==========================================================
   ACTIVATE
========================================================== */

self.addEventListener("activate", event => {

    console.log("[PBDPC SW] Activating...");

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames

                        .filter(cacheName => {

                            return cacheName.startsWith("pbdpc-") &&
                                   cacheName !== CACHE_NAME;

                        })

                        .map(cacheName => {

                            console.log(
                                "[PBDPC SW] Removing old cache:",
                                cacheName
                            );

                            return caches.delete(cacheName);

                        })

                );

            })

            .then(() => {

                return self.clients.claim();

            })

    );

});


/* ==========================================================
   FETCH
========================================================== */

self.addEventListener("fetch", event => {

    const request = event.request;

    /*
     * Only handle GET requests.
     */

    if (request.method !== "GET") {

        return;

    }


    /*
     * Ignore browser extensions and external resources.
     */

    if (!request.url.startsWith(self.location.origin)) {

        return;

    }


    event.respondWith(

        caches.match(request)

            .then(cachedResponse => {

                /*
                 * Cache First
                 */

                if (cachedResponse) {

                    return cachedResponse;

                }


                /*
                 * Fetch from network
                 */

                return fetch(request)

                    .then(networkResponse => {

                        /*
                         * Don't cache invalid responses.
                         */

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type !== "basic"
                        ) {

                            return networkResponse;

                        }


                        /*
                         * Clone response before caching.
                         */

                        const responseClone =
                            networkResponse.clone();


                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(
                                    request,
                                    responseClone
                                );

                            });


                        return networkResponse;

                    })

                    .catch(() => {

                        /*
                         * Offline fallback for HTML pages.
                         */

                        if (
                            request.headers.get("accept") &&
                            request.headers
                                .get("accept")
                                .includes("text/html")
                        ) {

                            return caches.match(
                                BASE_PATH + "index.html"
                            );

                        }

                    });

            })

    );

});


/* ==========================================================
   MESSAGE HANDLER
========================================================== */

self.addEventListener("message", event => {

    if (!event.data) return;


    /*
     * Force service worker update.
     */

    if (event.data.action === "SKIP_WAITING") {

        self.skipWaiting();

    }


    /*
     * Clear all PBDPC caches.
     */

    if (event.data.action === "CLEAR_CACHE") {

        event.waitUntil(

            caches.keys()

                .then(cacheNames => {

                    return Promise.all(

                        cacheNames

                            .filter(name =>
                                name.startsWith("pbdpc-")
                            )

                            .map(name =>
                                caches.delete(name)
                            )

                    );

                })

        );

    }

});


/* ==========================================================
   END OF SERVICE WORKER
========================================================== */