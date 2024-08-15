import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },  
    { path: 'home', component: HomeComponent }, 
    { path: 'categorias', loadChildren: () => import('./features/categorias/categorias.component').then(m => m.CategoriasComponent) },
    { path: 'produtos', loadComponent: () => import('./features/produtos/produtos.component').then(m => m.ProdutosComponent) },
    { path: '**', redirectTo: '' }  
];

