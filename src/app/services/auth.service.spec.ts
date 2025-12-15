import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

/**
 * Tests Unitaires pour AuthService.
 * Vérifie que les requêtes HTTP (Login, Register) sont correctement formées et exécutées.
 */
describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideHttpClient(), // Fournit HttpClient réel pour le service
                provideHttpClientTesting() // Mocke les requêtes HTTP
            ]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        // Vérifie qu'aucune requête HTTP n'est restée en attente
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /**
     * Teste l'envoi de la requête de connexion (POST /api/auth/login).
     */
    it('should send login request', () => {
        const dummyResponse = { token: 'xyz' };
        const email = 'test@test.com';
        const password = 'password';

        service.login(email, password).subscribe(res => {
            expect(res).toEqual(dummyResponse);
        });

        // Intercepte la requête et vérifie ses paramètres
        const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ email, password });

        // Simule la réponse serveur
        req.flush(dummyResponse);
    });

    /**
     * Teste l'envoi de la requête d'inscription (POST /api/auth/register).
     */
    it('should send register request', () => {
        const dummyResponse = { message: 'User registered' };
        const email = 'new@test.com';
        const password = 'password';

        service.register(email, password).subscribe(res => {
            expect(res).toEqual(dummyResponse);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ email, password });
        req.flush(dummyResponse);
    });
});
