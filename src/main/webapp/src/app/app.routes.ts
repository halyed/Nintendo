import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'consoles', loadComponent: () => import('./components/consoles/console-list/console-list.component').then(m => m.ConsoleListComponent) },
  { path: 'consoles/new', loadComponent: () => import('./components/consoles/console-form/console-form.component').then(m => m.ConsoleFormComponent) },
  { path: 'consoles/edit/:id', loadComponent: () => import('./components/consoles/console-form/console-form.component').then(m => m.ConsoleFormComponent) },
  { path: 'jeux', loadComponent: () => import('./components/jeux/jeu-list/jeu-list.component').then(m => m.JeuListComponent) },
  { path: 'jeux/new', loadComponent: () => import('./components/jeux/jeu-form/jeu-form.component').then(m => m.JeuFormComponent) },
  { path: 'jeux/edit/:id', loadComponent: () => import('./components/jeux/jeu-form/jeu-form.component').then(m => m.JeuFormComponent) },
  { path: 'clients', loadComponent: () => import('./components/clients/client-list/client-list.component').then(m => m.ClientListComponent) },
  { path: 'clients/new', loadComponent: () => import('./components/clients/client-form/client-form.component').then(m => m.ClientFormComponent) },
  { path: 'clients/edit/:id', loadComponent: () => import('./components/clients/client-form/client-form.component').then(m => m.ClientFormComponent) },
  { path: 'boutiques', loadComponent: () => import('./components/boutiques/boutique-list/boutique-list.component').then(m => m.BoutiqueListComponent) },
  { path: 'boutiques/new', loadComponent: () => import('./components/boutiques/boutique-form/boutique-form.component').then(m => m.BoutiqueFormComponent) },
  { path: 'boutiques/edit/:id', loadComponent: () => import('./components/boutiques/boutique-form/boutique-form.component').then(m => m.BoutiqueFormComponent) },
  { path: 'achats', loadComponent: () => import('./components/achats/achat-list/achat-list.component').then(m => m.AchatListComponent) },
  { path: 'achats/new', loadComponent: () => import('./components/achats/achat-form/achat-form.component').then(m => m.AchatFormComponent) },
  { path: 'achats/edit/:id', loadComponent: () => import('./components/achats/achat-form/achat-form.component').then(m => m.AchatFormComponent) },
  { path: '**', redirectTo: '' }
];
