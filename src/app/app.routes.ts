import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { Home } from './features/home/home/home';
import { ShareView } from './features/share/share-view/share-view';

/**
 * Définition des routes de l'application.
 * Mappe les URLs vers les composants correspondants.
 */
export const routes: Routes = [
    // Routes Authentification
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    // Page d'accueil publique
    { path: 'home', component: Home },

    // Espace connecté (Tableau de bord)
    { path: 'files', component: Dashboard },

    // Route Publique pour l'accès aux fichiers partagés via Token
    { path: 'share/:token', component: ShareView },

    // Redirection par défaut vers le login
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
