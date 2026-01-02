import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AnonymousUploadComponent } from './anonymous-upload'; // Check correct filename
import { FileService } from '../../../services/file.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('AnonymousUploadComponent', () => {
    let component: AnonymousUploadComponent;
    let fixture: ComponentFixture<AnonymousUploadComponent>;
    let mockFileService: any;
    let router: Router;

    beforeEach(async () => {
        mockFileService = {
            uploadAnonymous: jest.fn()
        };

        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule, AnonymousUploadComponent], // Standalone
            providers: [
                { provide: FileService, useValue: mockFileService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AnonymousUploadComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should upload a file anonymously', fakeAsync(() => {
        const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
        const event = { target: { files: { item: () => mockFile, 0: mockFile, length: 1 } } };

        // Create a mock response (HttpResponse)
        const mockResponse = new HttpResponse({
            body: { message: 'Success', shareToken: 'TOKEN123' }
        });

        mockFileService.uploadAnonymous.mockReturnValue(of(mockResponse));

        // Simulate file selection
        component.selectFile(event);

        // Trigger upload
        component.upload();
        tick();

        expect(mockFileService.uploadAnonymous).toHaveBeenCalled();
        expect(component.message).toContain('Success');
        expect(component.shareToken).toBe('TOKEN123');
        expect(component.progress).toBe(100);
    }));

    it('should handle upload error', fakeAsync(() => {
        const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
        const event = { target: { files: { item: () => mockFile, 0: mockFile, length: 1 } } };

        mockFileService.uploadAnonymous.mockReturnValue(throwError(() => ({ error: { message: 'Upload Failed' } })));

        component.selectFile(event);
        component.upload();
        tick();

        expect(component.message).toBe('Upload Failed');
        expect(component.progress).toBe(0);
    }));
});
