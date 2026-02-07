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
import { Achat } from '../../../models/achat.model';
import { AchatService } from '../../../services/achat.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-achat-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>Achats</mat-card-title><span class="spacer"></span><a mat-raised-button color="primary" routerLink="/achats/new"><mat-icon>add</mat-icon> Nouvel Achat</a></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <table mat-table [dataSource]="dataSource" matSort>
              <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th><td mat-cell *matCellDef="let row">{{ row.id }}</td></ng-container>
              <ng-container matColumnDef="jeu"><th mat-header-cell *matHeaderCellDef>Jeu</th><td mat-cell *matCellDef="let row">{{ row.jeu?.titre || '-' }}</td></ng-container>
              <ng-container matColumnDef="client"><th mat-header-cell *matHeaderCellDef>Client</th><td mat-cell *matCellDef="let row">{{ row.client ? row.client.prenom + ' ' + row.client.nom : '-' }}</td></ng-container>
              <ng-container matColumnDef="date"><th mat-header-cell *matHeaderCellDef mat-sort-header>Date</th><td mat-cell *matCellDef="let row">{{ row.date | date:'dd/MM/yyyy' }}</td></ng-container>
              <ng-container matColumnDef="prix"><th mat-header-cell *matHeaderCellDef mat-sort-header>Prix</th><td mat-cell *matCellDef="let row">{{ row.prix | currency:'EUR' }}</td></ng-container>
              <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef="let row"><a mat-icon-button color="primary" [routerLink]="['/achats/edit', row.id]"><mat-icon>edit</mat-icon></a><button mat-icon-button color="warn" (click)="delete(row)"><mat-icon>delete</mat-icon></button></td></ng-container>
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
export class AchatListComponent implements OnInit {
  private achatService = inject(AchatService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  displayedColumns = ['id', 'jeu', 'client', 'date', 'prix', 'actions'];
  dataSource = new MatTableDataSource<Achat>();
  loading = true;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { if (p) this.dataSource.paginator = p; }
  @ViewChild(MatSort) set sort(s: MatSort) { if (s) this.dataSource.sort = s; }

  ngOnInit(): void { this.load(); }
  private load(): void { this.achatService.getAll().subscribe({ next: (d) => { this.dataSource.data = d; this.loading = false; }, error: () => { this.loading = false; } }); }
  delete(a: Achat): void {
    this.dialog.open(ConfirmDialogComponent, { data: { title: 'Supprimer', message: 'Supprimer cet achat ?' } }).afterClosed().subscribe((ok) => {
      if (ok && a.id) this.achatService.delete(a.id).subscribe({ next: () => { this.snackBar.open('Supprimé', 'Fermer', { duration: 3000 }); this.load(); } });
    });
  }
}
