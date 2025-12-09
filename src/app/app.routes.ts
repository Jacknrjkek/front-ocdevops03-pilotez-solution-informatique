import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard/dashboard'; // Still renamed file-list technically container
import { Home } from './features/home/home/home';
import { ShareView } from './features/share/share-view/share-view';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home }, // New Landing
    { path: 'files', component: Dashboard }, // File List
    { path: 'share/:token', component: ShareView },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
