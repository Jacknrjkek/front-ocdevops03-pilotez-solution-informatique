import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';

/**
 * Intercepteur HTTP fonctionnel.
 *
 * Intercepte toutes les requêtes sortantes pour y injecter automatiquement
 * le Token JWT s'il est présent dans le stockage local (LocalStorage).
 * Permet l'authentification transparente auprès du Backend.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const storageService = inject(StorageService);
    const token = storageService.getToken();

    if (token) {
        console.log(`AuthInterceptor: Adding Token to ${req.method} ${req.url}`);
        // Clone la requête pour ajouter le header Authorization
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        });
        return next(cloned);
    } else {
        console.warn('AuthInterceptor: No token found in StorageService');
    }

    return next(req);
};
