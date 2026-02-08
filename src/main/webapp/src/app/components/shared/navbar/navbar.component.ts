import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>home</mat-icon>
      </button>
      <span class="brand">Nintendo Admin</span>
      <span class="spacer"></span>
      <nav class="nav-links">
        <a mat-button routerLink="/consoles" routerLinkActive="active">
          <mat-icon>videogame_asset</mat-icon>
          Consoles
        </a>
        <a mat-button routerLink="/jeux" routerLinkActive="active">
          <mat-icon>sports_esports</mat-icon>
          Jeux
        </a>
        <a mat-button routerLink="/clients" routerLinkActive="active">
          <mat-icon>people</mat-icon>
          Clients
        </a>
        <a mat-button routerLink="/boutiques" routerLinkActive="active">
          <mat-icon>store</mat-icon>
          Boutiques
        </a>
        <a mat-button routerLink="/achats" routerLinkActive="active">
          <mat-icon>shopping_cart</mat-icon>
          Achats
        </a>
      </nav>
      <span class="user-section">
        <mat-icon>account_circle</mat-icon>
        <span class="username">{{ authService.getUsername() }}</span>
        <button mat-icon-button (click)="authService.logout()" title="Déconnexion">
          <mat-icon>logout</mat-icon>
        </button>
      </span>
    </mat-toolbar>
  `,
  styles: [`
    .brand { margin-left: 8px; font-weight: 500; }
    .spacer { flex: 1 1 auto; }
    .nav-links a { margin-left: 8px; }
    .nav-links a.active { background: rgba(255, 255, 255, 0.1); }
    mat-icon { margin-right: 4px; }
    .user-section {
      display: flex;
      align-items: center;
      margin-left: 16px;
      gap: 4px;
    }
    .username {
      font-size: 14px;
      margin-right: 4px;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
}
