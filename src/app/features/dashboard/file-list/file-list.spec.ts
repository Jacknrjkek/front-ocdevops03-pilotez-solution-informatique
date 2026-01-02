import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FileList } from './file-list';
import { FileService } from '../../../services/file.service';
import { StorageService } from '../../../services/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

/**
 * Tests Unitaires pour le Composant FileList.
 * Vérifie l'affichage, le filtrage et la logique de suppression (Modal, Service).
 */
describe('FileList Component', () => {
    let component: FileList;
    let fixture: ComponentFixture<FileList>;
    let fileServiceMock: any;
    let storageServiceMock: any;

    const mockFiles = [
        { id: 1, originalName: 'file1.txt', size: 100, uploadDate: new Date().toISOString(), expirationDate: new Date(Date.now() + 86400000).toISOString(), downloadCount: 5 }, // Active
        { id: 2, originalName: 'file2.jpg', size: 2000, uploadDate: new Date().toISOString(), expirationDate: new Date(Date.now() - 86400000).toISOString(), downloadCount: 0 }  // Expired
    ];

    beforeEach(async () => {
        // Mock des services dépendants
        fileServiceMock = {
            getFiles: jest.fn().mockReturnValue(of(mockFiles)),
            deleteFile: jest.fn()
        };
        storageServiceMock = {
            getUser: jest.fn().mockReturnValue({ id: 1, email: 'test@test.com' })
        };

        await TestBed.configureTestingModule({
            imports: [FileList, RouterTestingModule],
            providers: [
                { provide: FileService, useValue: fileServiceMock },
                { provide: StorageService, useValue: storageServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FileList);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Déclenche ngOnInit
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /**
     * Vérifie le chargement initial des fichiers.
     */
    it('should retrieve files on init', () => {
        expect(fileServiceMock.getFiles).toHaveBeenCalled();
        expect(component.files.length).toBe(2);
    });

    /**
     * Teste la logique de filtrage (Tous / Actifs / Expirés).
     */
    it('should filter files correctly', () => {
        // Default filter 'all'
        expect(component.filteredFiles.length).toBe(2);

        // Filter 'active'
        component.setFilter('active');
        expect(component.filteredFiles.length).toBe(1);
        expect(component.filteredFiles[0].id).toBe(1);

        // Filter 'expired'
        component.setFilter('expired');
        expect(component.filteredFiles.length).toBe(1);
        expect(component.filteredFiles[0].id).toBe(2);
    });

    it('should open delete modal', () => {
        component.openDeleteModal(1);
        expect(component.showDeleteModal).toBeTruthy();
        expect(component.fileToDeleteId).toBe(1);
    });

    /**
     * Teste la suppression confirmée.
     * Utilise fakeAsync/tick pour gérer l'auto-dissimulation du message de confirmation.
     */
    it('should delete file successfully', fakeAsync(() => {
        component.openDeleteModal(1);

        fileServiceMock.deleteFile.mockReturnValue(of({ message: 'Deleted successfully' }));

        // Spy pour vérifier le rafraîchissement de la liste
        const retrieveSpy = jest.spyOn(component, 'retrieveFiles');

        component.confirmDelete();

        expect(fileServiceMock.deleteFile).toHaveBeenCalledWith(1);
        expect(component.showDeleteModal).toBeFalsy();
        expect(component.fileToDeleteId).toBeNull();
        expect(component.message).toBe('Deleted successfully');
        expect(retrieveSpy).toHaveBeenCalled();

        // Vérifie l'effacement du message après timeout (3s)
        tick(3000);
        expect(component.message).toBe('');
    }));

    /**
     * Teste la gestion des erreurs lors de suppression.
     */
    it('should handle delete error', () => {
        component.openDeleteModal(1);

        fileServiceMock.deleteFile.mockReturnValue(throwError(() => ({ status: 403, error: { message: 'Forbidden' } })));

        component.confirmDelete();

        expect(fileServiceMock.deleteFile).toHaveBeenCalledWith(1);
        expect(component.message).toContain('Forbidden');
    });

    it('should add a tag', () => {
        const mockFile = { id: 1, tags: [] as string[] };
        // Structure de l'event pour un input
        const mockEvent = { target: { value: 'NewTag' } };

        fileServiceMock.addTag = jest.fn().mockReturnValue(of({}));

        component.addTag(mockFile, mockEvent);

        expect(fileServiceMock.addTag).toHaveBeenCalledWith(1, 'NewTag');
        expect(mockFile.tags).toContain('NewTag');
        expect(mockEvent.target.value).toBe('');
    });

    it('should not add a tag > 30 chars', () => {
        const mockFile = { id: 1, tags: [] };
        const longTag = 'a'.repeat(31);
        const mockEvent = { target: { value: longTag } };

        // Mock addTag explicitly for this test if not already present
        fileServiceMock.addTag = jest.fn();

        component.addTag(mockFile, mockEvent);

        expect(fileServiceMock.addTag).not.toHaveBeenCalled();
        expect(component.message).toContain('30 caractères');
    });

    it('should remove a tag', () => {
        const mockFile = { id: 1, tags: ['OldTag'] };

        fileServiceMock.removeTag = jest.fn().mockReturnValue(of({}));

        component.removeTag(mockFile, 'OldTag');

        expect(fileServiceMock.removeTag).toHaveBeenCalledWith(1, 'OldTag');
        // Note: Le composant utilise filter, donc mockFile.tags est réassigné
        // Mais mockFile.tags est une référence locale ici qui ne sera pas "vue" changée
        // si le composant fait: file.tags = file.tags.filter(...)
        // SAUF si mockFile est exactement l'objet passé.
        // Testons le comportement du composant sur l'objet passé

        // ATTENTION: filter() retourne un nouveau tableau.
        // component.removeTag fait: file.tags = ...
        // Donc la propriété 'tags' de l'objet mockFile doit changer.
        expect(mockFile.tags.length).toBe(0);
    });
});
