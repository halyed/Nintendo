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
  selector: 'app-register',
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
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="header-icon">sports_esports</mat-icon>
          <mat-card-title>Nintendo Admin</mat-card-title>
          <mat-card-subtitle>Créer un nouveau compte</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (errorMessage) {
            <div class="error-message">{{ errorMessage }}</div>
          }

          <form (ngSubmit)="onRegister()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nom d'utilisateur</mat-label>
              <input matInput [(ngModel)]="username" name="username" required minlength="3">
              <mat-icon matPrefix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mot de passe</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" [(ngModel)]="password" name="password" required minlength="4">
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmer le mot de passe</mat-label>
              <input matInput [type]="hideConfirm ? 'password' : 'text'" [(ngModel)]="confirmPassword" name="confirmPassword" required>
              <mat-icon matPrefix>lock_outline</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hideConfirm = !hideConfirm">
                <mat-icon>{{ hideConfirm ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" class="full-width register-btn" [disabled]="loading">
              {{ loading ? 'Inscription...' : 'S\'inscrire' }}
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions align="end">
          <a mat-button routerLink="/login" color="accent">
            Déjà un compte ? Se connecter
          </a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #616161 0%, #424242 100%);
    }
    .register-card {
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
    .register-btn {
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
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;
  hideConfirm = true;
  loading = false;
  errorMessage = '';

  onRegister(): void {
    if (!this.username || !this.password || !this.confirmPassword) return;

    if (this.password.length < 4) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 4 caractères';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Ce nom d\'utilisateur est déjà pris';
        } else {
          this.errorMessage = 'Erreur lors de l\'inscription';
        }
        this.loading = false;
      }
    });
  }
}
