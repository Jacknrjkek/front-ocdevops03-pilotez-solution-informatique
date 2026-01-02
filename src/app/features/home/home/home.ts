import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousUploadComponent } from '../../transfer/anonymous-upload/anonymous-upload';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

/**
 * Page d'accueil (Landing Page).
 * Affiche le composant d'upload (FileUpload) et sert de point d'entrée.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AnonymousUploadComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private storageService = inject(StorageService);
  private router = inject(Router);

  /**
   * Vérifie si l'utilisateur est connecté pour adapter l'affichage.
   */
  get isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }

  /**
   * Redirige vers l'espace personnel (TdB) ou le login selon l'état.
   */
  goToSpace(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/files']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
