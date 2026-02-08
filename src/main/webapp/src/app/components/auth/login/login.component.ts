import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="header-icon">sports_esports</mat-icon>
          <mat-card-title>Nintendo Admin</mat-card-title>
          <mat-card-subtitle>Connectez-vous pour continuer</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (errorMessage) {
            <div class="error-message">{{ errorMessage }}</div>
          }

          <form (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nom d'utilisateur</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
              <mat-icon matPrefix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" [(ngModel)]="password" name="password" required>
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width login-btn" [disabled]="loading">
              {{ loading ? 'Connexion...' : 'Se connecter' }}
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions align="end">
          <a mat-button routerLink="/register" color="accent">
            Pas de compte ? S'inscrire
          </a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #616161 0%, #424242 100%);
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 24px;
    }
    .header-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #e8003e;
    }
    .full-width {
      width: 100%;
    }
    .login-btn {
      margin-top: 8px;
      height: 48px;
      font-size: 16px;
    }
    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      text-align: center;
    }
    mat-card-actions {
      padding: 0 16px 8px;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  hidePassword = true;
  loading = false;
  errorMessage = '';

  onLogin(): void {
    if (!this.username || !this.password) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }
}
