import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConsoleService } from '../../../services/console.service';
import { ConsoleType } from '../../../models/console.model';

@Component({
  selector: 'app-console-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEditMode ? 'Modifier' : 'Nouvelle' }} Console</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput formControlName="nom"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Prix</mat-label><input matInput type="number" formControlName="prix"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Date de sortie</mat-label><input matInput [matDatepicker]="picker" formControlName="dateSortie"><mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle><mat-datepicker #picker></mat-datepicker></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Type</mat-label><mat-select formControlName="type">@for (type of consoleTypes; track type) { <mat-option [value]="type">{{ type }}</mat-option> }</mat-select></mat-form-field>
              <div class="actions"><a mat-button routerLink="/consoles">Annuler</a><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">{{ isEditMode ? 'Modifier' : 'Créer' }}</button></div>
            </form>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { padding: 24px; max-width: 600px; margin: 0 auto; } form { display: flex; flex-direction: column; gap: 16px; } mat-form-field { width: 100%; } .actions { display: flex; justify-content: flex-end; gap: 8px; } .loading { display: flex; justify-content: center; padding: 48px; }`]
})
export class ConsoleFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private consoleService = inject(ConsoleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  form!: FormGroup;
  isEditMode = false;
  consoleId?: number;
  loading = false;
  saving = false;
  consoleTypes: ConsoleType[] = ['SALON', 'PORTABLE', 'HYBRIDE'];

  ngOnInit(): void {
    this.form = this.fb.group({ nom: ['', Validators.required], prix: [0, [Validators.required, Validators.min(0)]], dateSortie: ['', Validators.required], type: ['', Validators.required] });
    const id = this.route.snapshot.params['id'];
    if (id) { this.isEditMode = true; this.consoleId = +id; this.loadConsole(); }
  }

  private loadConsole(): void {
    this.loading = true;
    this.consoleService.getById(this.consoleId!).subscribe({
      next: (c) => { this.form.patchValue({ nom: c.nom, prix: c.prix, dateSortie: new Date(c.dateSortie), type: c.type }); this.loading = false; },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000 }); this.router.navigate(['/consoles']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const data = { ...this.form.value, dateSortie: this.form.value.dateSortie.toISOString().split('T')[0] };
    const op = this.isEditMode ? this.consoleService.update(this.consoleId!, data) : this.consoleService.create(data);
    op.subscribe({
      next: () => { this.snackBar.open('Sauvegardé', 'Fermer', { duration: 3000 }); this.router.navigate(['/consoles']); },
      error: () => { this.snackBar.open('Erreur', 'Fermer', { duration: 3000 }); this.saving = false; }
    });
  }
}
