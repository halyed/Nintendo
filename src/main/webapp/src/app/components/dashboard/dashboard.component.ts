import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';

import { ConsoleService } from '../../services/console.service';
import { JeuService } from '../../services/jeu.service';
import { ClientService } from '../../services/client.service';
import { BoutiqueService } from '../../services/boutique.service';
import { AchatService } from '../../services/achat.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de bord</h1>
      @if (loading) {
        <div class="loading"><mat-spinner></mat-spinner></div>
      } @else {
        <div class="cards-grid">
          @for (card of cards; track card.title) {
            <mat-card class="dashboard-card" [style.border-left-color]="card.color">
              <mat-card-header>
                <mat-icon mat-card-avatar [style.color]="card.color">{{ card.icon }}</mat-icon>
                <mat-card-title>{{ card.title }}</mat-card-title>
                <mat-card-subtitle>Total: {{ card.count }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-actions>
                <a mat-button [routerLink]="card.route" color="primary">Voir tout <mat-icon>arrow_forward</mat-icon></a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 24px; }
    h1 { margin-bottom: 24px; color: #333; }
    .loading { display: flex; justify-content: center; padding: 48px; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
    .dashboard-card { border-left: 4px solid; }
    mat-card-header { margin-bottom: 16px; }
    mat-icon[mat-card-avatar] { font-size: 40px; width: 40px; height: 40px; }
  `]
})
export class DashboardComponent implements OnInit {
  private consoleService = inject(ConsoleService);
  private jeuService = inject(JeuService);
  private clientService = inject(ClientService);
  private boutiqueService = inject(BoutiqueService);
  private achatService = inject(AchatService);

  loading = true;
  cards: any[] = [];

  ngOnInit(): void {
    forkJoin({
      consoles: this.consoleService.getAll(),
      jeux: this.jeuService.getAll(),
      clients: this.clientService.getAll(),
      boutiques: this.boutiqueService.getAll(),
      achats: this.achatService.getAll()
    }).subscribe({
      next: (data) => {
        this.cards = [
          { title: 'Consoles', count: data.consoles.length, icon: 'videogame_asset', color: '#3f51b5', route: '/consoles' },
          { title: 'Jeux', count: data.jeux.length, icon: 'sports_esports', color: '#e91e63', route: '/jeux' },
          { title: 'Clients', count: data.clients.length, icon: 'people', color: '#4caf50', route: '/clients' },
          { title: 'Boutiques', count: data.boutiques.length, icon: 'store', color: '#ff9800', route: '/boutiques' },
          { title: 'Achats', count: data.achats.length, icon: 'shopping_cart', color: '#9c27b0', route: '/achats' }
        ];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
