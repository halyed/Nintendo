import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { JeuService } from '../../../services/jeu.service';
import { ConsoleService } from '../../../services/console.service';
import { BoutiqueService } from '../../../services/boutique.service';
import { Console } from '../../../models/console.model';
import { Boutique } from '../../../models/boutique.model';

@Component({
  selector: 'app-jeu-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEditMode ? 'Modifier' : 'Nouveau' }} Jeu</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline"><mat-label>Titre</mat-label><input matInput formControlName="titre"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Console</mat-label><mat-select formControlName="consoleId"><mat-option [value]="null">-- Aucune --</mat-option>@for (c of consoles; track c.id) { <mat-option [value]="c.id">{{ c.nom }}</mat-option> }</mat-select></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Boutique</mat-label><mat-select formControlName="boutiqueId"><mat-option [value]="null">-- Aucune --</mat-option>@for (b of boutiques; track b.id) { <mat-option [value]="b.id">{{ b.nom }}</mat-option> }</mat-select></mat-form-field>
              <div class="actions"><a mat-button routerLink="/jeux">Annuler</a><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">{{ isEditMode ? 'Modifier' : 'Créer' }}</button></div>
            </form>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { padding: 24px; max-width: 600px; margin: 0 auto; } form { display: flex; flex-direction: column; gap: 16px; } mat-form-field { width: 100%; } .actions { display: flex; justify-content: flex-end; gap: 8px; } .loading { display: flex; justify-content: center; padding: 48px; }`]
})
export class JeuFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private jeuService = inject(JeuService);
  private consoleService = inject(ConsoleService);
  private boutiqueService = inject(BoutiqueService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  form!: FormGroup;
  isEditMode = false;
  jeuId?: number;
  loading = true;
  saving = false;
  consoles: Console[] = [];
  boutiques: Boutique[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({ titre: ['', Validators.required], consoleId: [null], boutiqueId: [null] });
    const id = this.route.snapshot.params['id'];
    if (id) { this.isEditMode = true; this.jeuId = +id; }
    forkJoin({ consoles: this.consoleService.getAll(), boutiques: this.boutiqueService.getAll() }).subscribe({
      next: (data) => { this.consoles = data.consoles; this.boutiques = data.boutiques; if (this.isEditMode) this.loadJeu(); else this.loading = false; }
    });
  }

  private loadJeu(): void {
    this.jeuService.getById(this.jeuId!).subscribe({
      next: (j) => { this.form.patchValue({ titre: j.titre, consoleId: j.console?.id, boutiqueId: j.boutique?.id }); this.loading = false; },
      error: () => { this.router.navigate(['/jeux']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const v = this.form.value;
    const data = { titre: v.titre, console: v.consoleId ? { id: v.consoleId } : null, boutique: v.boutiqueId ? { id: v.boutiqueId } : null };
    const op = this.isEditMode ? this.jeuService.update(this.jeuId!, data) : this.jeuService.create(data);
    op.subscribe({ next: () => { this.snackBar.open('Sauvegardé', 'Fermer', { duration: 3000 }); this.router.navigate(['/jeux']); }, error: () => { this.saving = false; } });
  }
}
