import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

/**
 * Composant de la page d'Inscription.
 * Gère le formulaire et l'affichage des erreurs de validation serveur.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: any = {
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Soumission du formulaire d'inscription.
   */
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.isSignUpFailed = false;
        // Redirection vers l'accueil après succès
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Register Error:', err);
        // Gestion générique
        let msg = "Erreur d'inscription";

        if (err.error) {
          // Message d'erreur spécifique du backend
          if (err.error.message) {
            msg = err.error.message;
          }

          // Gestion des erreurs de Validation (@Valid Spring Boot)
          // Transforme la liste des champs invalides en message lisible
          if (err.error.errors && Array.isArray(err.error.errors)) {
            const validationErrors = err.error.errors.map((e: any) => {
              // Traduction sommaire pour l'utilisateur
              if (e.field === 'email') return 'Email invalide';
              if (e.field === 'password') return 'Mot de passe trop court (min 8 caractères)';
              return `${e.field}: ${e.defaultMessage}`;
            });
            msg = validationErrors.join(', ');
          }
        }

        this.errorMessage = msg;
        this.isSignUpFailed = true;
      }
    });
  }
}
