import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: '', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'consoles', loadComponent: () => import('./components/consoles/console-list/console-list.component').then(m => m.ConsoleListComponent), canActivate: [authGuard] },
  { path: 'consoles/new', loadComponent: () => import('./components/consoles/console-form/console-form.component').then(m => m.ConsoleFormComponent), canActivate: [authGuard] },
  { path: 'consoles/edit/:id', loadComponent: () => import('./components/consoles/console-form/console-form.component').then(m => m.ConsoleFormComponent), canActivate: [authGuard] },
  { path: 'jeux', loadComponent: () => import('./components/jeux/jeu-list/jeu-list.component').then(m => m.JeuListComponent), canActivate: [authGuard] },
  { path: 'jeux/new', loadComponent: () => import('./components/jeux/jeu-form/jeu-form.component').then(m => m.JeuFormComponent), canActivate: [authGuard] },
  { path: 'jeux/edit/:id', loadComponent: () => import('./components/jeux/jeu-form/jeu-form.component').then(m => m.JeuFormComponent), canActivate: [authGuard] },
  { path: 'clients', loadComponent: () => import('./components/clients/client-list/client-list.component').then(m => m.ClientListComponent), canActivate: [authGuard] },
  { path: 'clients/new', loadComponent: () => import('./components/clients/client-form/client-form.component').then(m => m.ClientFormComponent), canActivate: [authGuard] },
  { path: 'clients/edit/:id', loadComponent: () => import('./components/clients/client-form/client-form.component').then(m => m.ClientFormComponent), canActivate: [authGuard] },
  { path: 'boutiques', loadComponent: () => import('./components/boutiques/boutique-list/boutique-list.component').then(m => m.BoutiqueListComponent), canActivate: [authGuard] },
  { path: 'boutiques/new', loadComponent: () => import('./components/boutiques/boutique-form/boutique-form.component').then(m => m.BoutiqueFormComponent), canActivate: [authGuard] },
  { path: 'boutiques/edit/:id', loadComponent: () => import('./components/boutiques/boutique-form/boutique-form.component').then(m => m.BoutiqueFormComponent), canActivate: [authGuard] },
  { path: 'achats', loadComponent: () => import('./components/achats/achat-list/achat-list.component').then(m => m.AchatListComponent), canActivate: [authGuard] },
  { path: 'achats/new', loadComponent: () => import('./components/achats/achat-form/achat-form.component').then(m => m.AchatFormComponent), canActivate: [authGuard] },
  { path: 'achats/edit/:id', loadComponent: () => import('./components/achats/achat-form/achat-form.component').then(m => m.AchatFormComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
