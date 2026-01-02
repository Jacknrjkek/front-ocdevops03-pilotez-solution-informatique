import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousUploadComponent } from '../../transfer/anonymous-upload/anonymous-upload';
import { HeaderComponent } from '../../../layout/header/header';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

/**
 * Page d'accueil (Landing Page).
 * Affiche le composant d'upload (FileUpload) et sert de point d'entrée.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AnonymousUploadComponent, HeaderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private storageService = inject(StorageService);
  private authService = inject(AuthService);
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

  logout(): void {
    this.authService.logout();
    this.storageService.clean();
    this.router.navigate(['/home']);
  }
}
