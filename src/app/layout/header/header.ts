import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/**
 * Composant d'entête (Header) global.
 * Pemet la navigation et la déconnexion via un événement.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  // Émet un événement lors du clic sur Logout pour que le parent gère la logique
  @Output() logoutEvent = new EventEmitter<void>();

  private router = inject(Router);

  onLogout() {
    this.logoutEvent.emit();
  }
}
