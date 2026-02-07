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
import { forkJoin } from 'rxjs';
import { AchatService } from '../../../services/achat.service';
import { JeuService } from '../../../services/jeu.service';
import { ClientService } from '../../../services/client.service';
import { Jeu } from '../../../models/jeu.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-achat-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>{{ isEditMode ? 'Modifier' : 'Nouvel' }} Achat</mat-card-title></mat-card-header>
        <mat-card-content>
          @if (loading) { <div class="loading"><mat-spinner></mat-spinner></div> }
          @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline"><mat-label>Client</mat-label><mat-select formControlName="clientId">@for (c of clients; track c.id) { <mat-option [value]="c.id">{{ c.prenom }} {{ c.nom }}</mat-option> }</mat-select></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Jeu</mat-label><mat-select formControlName="jeuId">@for (j of jeux; track j.id) { <mat-option [value]="j.id">{{ j.titre }}</mat-option> }</mat-select></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Date</mat-label><input matInput [matDatepicker]="picker" formControlName="date"><mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle><mat-datepicker #picker></mat-datepicker></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Prix</mat-label><input matInput type="number" formControlName="prix"></mat-form-field>
              <div class="actions"><a mat-button routerLink="/achats">Annuler</a><button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">{{ isEditMode ? 'Modifier' : 'Créer' }}</button></div>
            </form>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { padding: 24px; max-width: 600px; margin: 0 auto; } form { display: flex; flex-direction: column; gap: 16px; } mat-form-field { width: 100%; } .actions { display: flex; justify-content: flex-end; gap: 8px; } .loading { display: flex; justify-content: center; padding: 48px; }`]
})
export class AchatFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private achatService = inject(AchatService);
  private jeuService = inject(JeuService);
  private clientService = inject(ClientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  form!: FormGroup;
  isEditMode = false;
  achatId?: number;
  loading = true;
  saving = false;
  jeux: Jeu[] = [];
  clients: Client[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({ clientId: [null, Validators.required], jeuId: [null, Validators.required], date: ['', Validators.required], prix: [0, [Validators.required, Validators.min(0)]] });
    const id = this.route.snapshot.params['id'];
    if (id) { this.isEditMode = true; this.achatId = +id; }
    forkJoin({ jeux: this.jeuService.getAll(), clients: this.clientService.getAll() }).subscribe({
      next: (d) => { this.jeux = d.jeux; this.clients = d.clients; if (this.isEditMode) this.loadAchat(); else this.loading = false; }
    });
  }

  private loadAchat(): void {
    this.achatService.getById(this.achatId!).subscribe({
      next: (a) => { this.form.patchValue({ clientId: a.client?.id, jeuId: a.jeu?.id, date: new Date(a.date), prix: a.prix }); this.loading = false; },
      error: () => { this.router.navigate(['/achats']); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const v = this.form.value;
    const data = { jeu: { id: v.jeuId }, date: v.date.toISOString().split('T')[0], prix: v.prix };
    const op = this.isEditMode ? this.achatService.update(this.achatId!, data) : this.achatService.create(v.clientId, data);
    op.subscribe({ next: () => { this.snackBar.open('Sauvegardé', 'Fermer', { duration: 3000 }); this.router.navigate(['/achats']); }, error: () => { this.saving = false; } });
  }
}
