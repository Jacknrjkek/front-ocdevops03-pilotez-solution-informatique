import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StorageService]
        });
        service = TestBed.inject(StorageService);

        // Clear local storage before each test
        window.localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save and get token', () => {
        service.saveToken('test-token');
        expect(service.getToken()).toBe('test-token');
    });

    it('should save and get user', () => {
        const user = { id: 1, email: 'test@test.com' };
        service.saveUser(user);
        expect(service.getUser()).toEqual(user);
    });

    it('should check if logged in', () => {
        expect(service.isLoggedIn()).toBeFalsy();

        service.saveUser({ id: 1 });
        expect(service.isLoggedIn()).toBeTruthy();
    });

    it('should logout/clean', () => {
        service.saveToken('token');
        service.saveUser({ id: 1 });

        service.clean();

        expect(service.getToken()).toBeNull(); // Or whatever the valid empty state is
        expect(service.isLoggedIn()).toBeFalsy();
    });
});
