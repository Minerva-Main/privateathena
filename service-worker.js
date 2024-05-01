    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
            console.log('Service Worker registered:', registration);
            })
            .catch(error => {
            console.error('Service Worker registration failed:', error);
            });
        });
    }

    // Inside service-worker.js

    const CACHE_NAME = 'my-site-cache-v1';
    const urlsToCache = [
    '/',
    '/class.html',
    '/upload.html',
    '/videos.html',
    '/chatbot.html',
    '/class.js',
    '/class2.html',
    '/class2.js',
    '/style.css',
    '/aboutus.html',
    '/e-books.html',

    ];

    self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
    });

    self.addEventListener('fetch', event => {
        event.respondWith(
        caches.match(event.request)
            .then(response => {
            if (response) {
                return response; // Found in cache
            }
            return fetch(event.request); // Not found, fetch from network
            })
        );
    });

    self.addEventListener('fetch', event => {
        // Check if the request is an XHR request
        if (event.request.mode === 'cors' && event.request.headers.get('accept').includes('text/html')) {
          // If it's an XHR request for HTML content, respond with a custom response
          event.respondWith(
            new Response('<h1>XHR requests for HTML content are blocked.</h1>', {
              headers: { 'Content-Type': 'text/html' },
              status: 403 // Forbidden status code
            })
          );
        } else {
          // For other types of requests, proceed as usual (e.g., fetch from cache or network)
          event.respondWith(
            caches.match(event.request)
              .then(response => {
                if (response) {
                  return response; // Found in cache
                }
                return fetch(event.request); // Not found, fetch from network
              })
          );
        }
      });