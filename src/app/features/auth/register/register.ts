import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.isSignUpFailed = false;
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Register Error:', err);
        // Default message
        let msg = "Erreur d'inscription";

        if (err.error) {
          // Check for specific backend message
          if (err.error.message) {
            msg = err.error.message;
          }

          // Check for validation errors (Spring Boot default structure)
          if (err.error.errors && Array.isArray(err.error.errors)) {
            const validationErrors = err.error.errors.map((e: any) => {
              // Try to translate common constraints if possible, or use default message
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
