import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

describe('FileService', () => {
    let service: FileService;
    let httpMock: HttpTestingController;
    let storageServiceMock: any;

    beforeEach(() => {
        storageServiceMock = {
            getToken: jest.fn().mockReturnValue('mock-token')
        };

        TestBed.configureTestingModule({
            providers: [
                FileService,
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: StorageService, useValue: storageServiceMock }
            ]
        });
        service = TestBed.inject(FileService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should upload a file', () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });

        service.upload(file).subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/files/upload');
        expect(req.request.method).toBe('POST');
        expect(req.request.body instanceof FormData).toBeTruthy();
        req.flush({});
    });

    it('should get files', () => {
        const dummyFiles = [{ name: 'file1' }, { name: 'file2' }];

        service.getFiles().subscribe(files => {
            expect(files.length).toBe(2);
            expect(files).toEqual(dummyFiles);
        });

        const req = httpMock.expectOne('http://localhost:8080/api/files');
        expect(req.request.method).toBe('GET');
        req.flush(dummyFiles);
    });

    it('should delete a file', () => {
        service.deleteFile(1).subscribe();

        const req = httpMock.expectOne('http://localhost:8080/api/files/delete/1');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
        req.flush({});
    });
});
