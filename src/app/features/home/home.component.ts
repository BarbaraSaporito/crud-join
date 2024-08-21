import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ProdutosComponent } from '../produtos/produtos.component';
import { RelacionamentoComponent } from '../relacionamento/relacionamento.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    CategoriasComponent,
    ProdutosComponent,
    MatIconModule,
    RelacionamentoComponent,
  
],
  template: `
      <header>
        <button mat-icon-button class="logout-button" (click)="onLogout()">
          <mat-icon>logout</mat-icon>
        </button>
      </header>
      <mat-tab-group>
        <mat-tab label="Categorias">
          <app-categorias></app-categorias>
        </mat-tab>
        <mat-tab label="Produtos">
          <app-produtos></app-produtos>
        </mat-tab>
        <mat-tab label="Relacionar Produto e Categoria">
          <app-relacionamento></app-relacionamento>
        </mat-tab>
      </mat-tab-group>
    
  `,
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
