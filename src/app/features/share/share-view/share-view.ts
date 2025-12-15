import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '../../../services/share.service';
import { DatePipe } from '@angular/common';

/**
 * Page publique de téléchargement d'un fichier partagé.
 * Accessible via un lien contenant un TOKEN unique.
 */
@Component({
  selector: 'app-share-view',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './share-view.html',
  styleUrl: './share-view.scss'
})
export class ShareView implements OnInit {
  token: string | null = null;
  fileData: any = null;
  errorMessage = '';
  loading = true;

  private route = inject(ActivatedRoute);
  private shareService = inject(ShareService);
  private cd = inject(ChangeDetectorRef);

  /**
   * Initialisation : Récupération du token depuis l'URL et chargement des infos.
   */
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.fetchMetadata(this.token);
    } else {
      this.errorMessage = 'Lien invalide.';
      this.loading = false;
    }
  }

  /**
   * Appelle l'API pour récupérer les détails du fichier (Nom, Taille, etc.)
   * sans le télécharger immédiatement.
   */
  fetchMetadata(token: string): void {
    this.shareService.getShareMetadata(token).subscribe({
      next: (data) => {
        this.fileData = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        // Gestion des erreurs spécifiques (410 Gone = Expiré)
        if (err.status === 410) {
          this.errorMessage = 'Ce lien a expiré.';
        } else {
          this.errorMessage = 'Fichier introuvable ou erreur serveur.';
        }
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Déclenche le téléchargement physique du fichier.
   */
  download(): void {
    if (this.token) {
      // Redirection directe vers l'URL de téléchargement (géré par le navigateur)
      window.location.href = this.shareService.getDownloadUrl(this.token);
    }
  }
}
