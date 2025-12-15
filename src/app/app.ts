import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Composant racine de l'application.
 * Sert principalement de conteneur pour le RouterOutlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('datashare-frontend');
}
