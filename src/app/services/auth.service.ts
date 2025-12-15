import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Service gérant l'authentification (Connexion, Inscription).
 * Communique avec le backend Spring Boot via les endpoints /api/auth/*.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

    /**
     * Authentifie l'utilisateur.
     * @param email Email de l'utilisateur
     * @param password Mot de passe (sera envoyé via HTTPS en production)
     * @returns Observable contenant le JWT et les infos user
     */
    login(email: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'login',
            {
                email,
                password
            },
            httpOptions
        );
    }

    /**
     * Inscrit un nouvel utilisateur.
     * @param email Email valide
     * @param password Mot de passe (min 8 chars)
     */
    register(email: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'register',
            {
                email,
                password
            },
            httpOptions
        );
    }

    logout(): void {
        // Déconnexion purement client-side (suppression du token stocké)
        // Pas d'appel backend requis car utilisation de JWT Stateless
    }
}
