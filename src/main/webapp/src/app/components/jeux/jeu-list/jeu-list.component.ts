import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Jeu } from '../../../models/jeu.model';
import { JeuService } from '../../../services/jeu.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-jeu-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Jeux</mat-card-title>
          <span class="spacer"></span>
          <a mat-raised-button color="primary" routerLink="/jeux/new"><mat-icon>add</mat-icon> Nouveau Jeu</a>
        </mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <table mat-table [dataSource]="dataSource" matSort>
              <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th><td mat-cell *matCellDef="let row">{{ row.id }}</td></ng-container>
              <ng-container matColumnDef="titre"><th mat-header-cell *matHeaderCellDef mat-sort-header>Titre</th><td mat-cell *matCellDef="let row">{{ row.titre }}</td></ng-container>
              <ng-container matColumnDef="console"><th mat-header-cell *matHeaderCellDef>Console</th><td mat-cell *matCellDef="let row">{{ row.console?.nom || '-' }}</td></ng-container>
              <ng-container matColumnDef="boutique"><th mat-header-cell *matHeaderCellDef>Boutique</th><td mat-cell *matCellDef="let row">{{ row.boutique?.nom || '-' }}</td></ng-container>
              <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef="let row"><a mat-icon-button color="primary" [routerLink]="['/jeux/edit', row.id]"><mat-icon>edit</mat-icon></a><button mat-icon-button color="warn" (click)="delete(row)"><mat-icon>delete</mat-icon></button></td></ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
            <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { padding: 24px; } mat-card-header { display: flex; align-items: center; margin-bottom: 16px; } .spacer { flex: 1 1 auto; } table { width: 100%; } .loading { display: flex; justify-content: center; padding: 48px; }`]
})
export class JeuListComponent implements OnInit {
  private jeuService = inject(JeuService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  displayedColumns = ['id', 'titre', 'console', 'boutique', 'actions'];
  dataSource = new MatTableDataSource<Jeu>();
  loading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void { this.load(); }
  private load(): void {
    this.jeuService.getAll().subscribe({ next: (data) => { this.dataSource.data = data; this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; this.loading = false; }, error: () => { this.loading = false; } });
  }
  delete(jeu: Jeu): void {
    this.dialog.open(ConfirmDialogComponent, { data: { title: 'Supprimer', message: `Supprimer "${jeu.titre}" ?` } }).afterClosed().subscribe((ok) => {
      if (ok && jeu.id) this.jeuService.delete(jeu.id).subscribe({ next: () => { this.snackBar.open('Supprimé', 'Fermer', { duration: 3000 }); this.load(); } });
    });
  }
}
