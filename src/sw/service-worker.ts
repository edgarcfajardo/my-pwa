/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST || []);

// Manejar solicitudes cuando hay error de conexión
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch((error) => {
      // Si falla la solicitud (probablemente por offline)
      console.log('Error de conexión:', error.message);
      
      // Puedes retornar una respuesta de fallback aquí
      // Por ejemplo, una página offline personalizada
      return new Response('Modo offline - No hay conexión a internet', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain'
        })
      });
    })
  );
});