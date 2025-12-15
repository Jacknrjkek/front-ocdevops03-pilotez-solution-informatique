import { TestBed } from '@angular/core/testing';
import { App } from './app';

/**
 * Tests Unitaires pour le Composant racine App.
 * Vérifie simplement la création de l'application.
 */
describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
