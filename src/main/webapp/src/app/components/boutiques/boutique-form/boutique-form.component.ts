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
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEditMode ? 'Modifier' : 'Nouvelle' }} Boutique</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline"><mat-label>Nom</mat-label><input matInput formControlName="nom"></mat-form-field>
              <h3>Adresse</h3>
              <div class="address-row">
                <mat-form-field appearance="outline" class="numero"><mat-label>N°</mat-label><input matInput type="number" formControlName="numero"></mat-form-field>
                <mat-form-field appearance="outline" class="rue"><mat-label>Rue</mat-label><input matInput formControlName="rue"></mat-form-field>
              </div>
              <mat-form-field appearance="outline"><mat-label>Ville</mat-label><input matInput formControlName="ville"></mat-form-field>
              <div class="actions"><a mat-button routerLink="/boutiques">Annuler</a><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">{{ isEditMode ? 'Modifier' : 'Créer' }}</button></div>
            </form>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { padding: 24px; max-width: 600px; margin: 0 auto; } form { display: flex; flex-direction: column; gap: 16px; } mat-form-field { width: 100%; } h3 { margin: 8px 0; color: #666; } .address-row { display: flex; gap: 16px; } .numero { width: 100px; flex-shrink: 0; } .rue { flex: 1; } .actions { display: flex; justify-content: flex-end; gap: 8px; } .loading { display: flex; justify-content: center; padding: 48px; }`]
})
export class BoutiqueFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private boutiqueService = inject(BoutiqueService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  form!: FormGroup;
  isEditMode = false;
  boutiqueId?: number;
  loading = false;
  saving = false;

  ngOnInit(): void {
    this.form = this.fb.group({ nom: ['', Validators.required], numero: [null, Validators.required], rue: ['', Validators.required], ville: ['', Validators.required] });
    const id = this.route.snapshot.params['id'];
    if (id) { this.isEditMode = true; this.boutiqueId = +id; this.loadBoutique(); }
  }

  private loadBoutique(): void {
    this.loading = true;
    this.boutiqueService.getById(this.boutiqueId!).subscribe({ next: (b) => { this.form.patchValue({ nom: b.nom, numero: b.adresse?.numero, rue: b.adresse?.rue, ville: b.adresse?.ville }); this.loading = false; }, error: () => { this.router.navigate(['/boutiques']); } });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const v = this.form.value;
    const data = { nom: v.nom, adresse: { numero: v.numero, rue: v.rue, ville: v.ville } };
    const op = this.isEditMode ? this.boutiqueService.update(this.boutiqueId!, data) : this.boutiqueService.create(data);
    op.subscribe({ next: () => { this.snackBar.open('Sauvegardé', 'Fermer', { duration: 3000 }); this.router.navigate(['/boutiques']); }, error: () => { this.saving = false; } });
  }
}
