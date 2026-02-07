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
import { Boutique } from '../../../models/boutique.model';
import { BoutiqueService } from '../../../services/boutique.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-boutique-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>Boutiques</mat-card-title><span class="spacer"></span><a mat-raised-button color="primary" routerLink="/boutiques/new"><mat-icon>add</mat-icon> Nouvelle Boutique</a></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <table mat-table [dataSource]="dataSource" matSort>
              <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th><td mat-cell *matCellDef="let row">{{ row.id }}</td></ng-container>
              <ng-container matColumnDef="nom"><th mat-header-cell *matHeaderCellDef mat-sort-header>Nom</th><td mat-cell *matCellDef="let row">{{ row.nom }}</td></ng-container>
              <ng-container matColumnDef="adresse"><th mat-header-cell *matHeaderCellDef>Adresse</th><td mat-cell *matCellDef="let row">{{ row.adresse?.numero }} {{ row.adresse?.rue }}, {{ row.adresse?.ville }}</td></ng-container>
              <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef="let row"><a mat-icon-button color="primary" [routerLink]="['/boutiques/edit', row.id]"><mat-icon>edit</mat-icon></a><button mat-icon-button color="warn" (click)="delete(row)"><mat-icon>delete</mat-icon></button></td></ng-container>
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
export class BoutiqueListComponent implements OnInit {
  private boutiqueService = inject(BoutiqueService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  displayedColumns = ['id', 'nom', 'adresse', 'actions'];
  dataSource = new MatTableDataSource<Boutique>();
  loading = true;

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) { if (p) this.dataSource.paginator = p; }
  @ViewChild(MatSort) set sort(s: MatSort) { if (s) this.dataSource.sort = s; }

  ngOnInit(): void { this.load(); }
  private load(): void { this.boutiqueService.getAll().subscribe({ next: (d) => { this.dataSource.data = d; this.loading = false; }, error: () => { this.loading = false; } }); }
  delete(b: Boutique): void {
    this.dialog.open(ConfirmDialogComponent, { data: { title: 'Supprimer', message: `Supprimer "${b.nom}" ?` } }).afterClosed().subscribe((ok) => {
      if (ok && b.id) this.boutiqueService.delete(b.id).subscribe({ next: () => { this.snackBar.open('Supprimé', 'Fermer', { duration: 3000 }); this.load(); } });
    });
  }
}
