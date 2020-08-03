var CACHE_NAME = 'apresenta-rio-card-v01-01';
var urlsToCache = [
	'/apresenta-rio/',
	'/apresenta-rio/index.html',
	'/apresenta-rio/offline.html',
	'/apresenta-rio/404.html',
	'/apresenta-rio/favicon/android-chrome-512x512.png',
	'/apresenta-rio/css/all.css',
	'/apresenta-rio/webfonts/fa-brands-400.eot',
	'/apresenta-rio/webfonts/fa-brands-400.svg',
	'/apresenta-rio/webfonts/fa-brands-400.ttf',
	'/apresenta-rio/webfonts/fa-brands-400.woff',
	'/apresenta-rio/webfonts/fa-brands-400.woff2',
	'/apresenta-rio/webfonts/fa-regular-400.eot',
	'/apresenta-rio/webfonts/fa-regular-400.svg',
	'/apresenta-rio/webfonts/fa-regular-400.ttf',
	'/apresenta-rio/webfonts/fa-regular-400.woff',
	'/apresenta-rio/webfonts/fa-regular-400.woff2',
	'/apresenta-rio/webfonts/fa-solid-900.eot',
	'/apresenta-rio/webfonts/fa-solid-900.svg',
	'/apresenta-rio/webfonts/fa-solid-900.ttf',
	'/apresenta-rio/webfonts/fa-solid-900.woff',
	'/apresenta-rio/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/apresenta-rio/imgs/mauricio-jun-sobre-picture-mobile.png',
	'/apresenta-rio/imgs/mauricio-jun-sobre-picture-mobile-02.png',
	'/apresenta-rio/imgs/logo-cartao-digital-puro-v01-01.png',
	'/apresenta-rio/imgs/portfolio-01.png',
	'/apresenta-rio/imgs/portfolio-02.png',
	'/apresenta-rio/imgs/portfolio-03.png',
	'/apresenta-rio/imgs/logo-bkg-03-mobile-transparente.png',
	'/apresenta-rio/imgs/logo-mauricio-jun-cartao-digital-horiz-v01-01.png',
	'/apresenta-rio/imgs/dcard-cartao-digital-molde-cabecalho-v01-01.png',
	'/apresenta-rio/imgs/picture-circle-bkg.png',
	'/apresenta-rio/imgs/mauricio-jun-dcard-slide-01.jpg',
	'/apresenta-rio/imgs/mauricio-jun-dcard-slide-02.jpg',
	'/apresenta-rio/imgs/mauricio-jun-dcard-slide-03.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/apresenta-rio/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/apresenta-rio/offline.html');
		})
	);
});