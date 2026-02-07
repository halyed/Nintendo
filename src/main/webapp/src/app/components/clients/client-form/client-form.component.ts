import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEditMode ? 'Modifier' : 'Nouveau' }} Client</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput formControlName="nom"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Prénom</mat-label><input matInput formControlName="prenom"></mat-form-field>
              <div class="actions"><a mat-button routerLink="/clients">Annuler</a><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">{{ isEditMode ? 'Modifier' : 'Créer' }}</button></div>
            </form>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { padding: 24px; max-width: 600px; margin: 0 auto; } form { display: flex; flex-direction: column; gap: 16px; } mat-form-field { width: 100%; } .actions { display: flex; justify-content: flex-end; gap: 8px; } .loading { display: flex; justify-content: center; padding: 48px; }`]
})
export class ClientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  form!: FormGroup;
  isEditMode = false;
  clientId?: number;
  loading = false;
  saving = false;

  ngOnInit(): void {
    this.form = this.fb.group({ nom: ['', Validators.required], prenom: ['', Validators.required] });
    const id = this.route.snapshot.params['id'];
    if (id) { this.isEditMode = true; this.clientId = +id; this.loadClient(); }
  }

  private loadClient(): void {
    this.loading = true;
    this.clientService.getById(this.clientId!).subscribe({ next: (c) => { this.form.patchValue({ nom: c.nom, prenom: c.prenom }); this.loading = false; }, error: () => { this.router.navigate(['/clients']); } });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const op = this.isEditMode ? this.clientService.update(this.clientId!, this.form.value) : this.clientService.create(this.form.value);
    op.subscribe({ next: () => { this.snackBar.open('Sauvegardé', 'Fermer', { duration: 3000 }); this.router.navigate(['/clients']); }, error: () => { this.saving = false; } });
  }
}
