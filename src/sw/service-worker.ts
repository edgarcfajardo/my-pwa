/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

// Mostrar mensaje de offline
self.addEventListener('fetch', event => {
  if (!navigator.onLine) {
    console.log('Offline: no hay conexión de red.');
  }
});
