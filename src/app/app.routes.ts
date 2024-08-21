import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  },
    {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  
  {
    path: '**',
    redirectTo: '',
  },
];
