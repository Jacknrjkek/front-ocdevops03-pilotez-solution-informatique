import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/helpers/auth.interceptor';

/**
 * Configuration globale de l'application Angular (Standalone Application).
 *
 * - Configure le routeur avec les définitions de routes.
 * - Configure le client HTTP avec l'intercepteur d'authentification (JWT).
 * - Active la gestion globale des erreurs.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), // Système de routage
    provideHttpClient(withInterceptors([authInterceptor])) // Injection auto du Token JWT
  ]
};
