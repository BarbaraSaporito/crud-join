import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Categoria } from '../../interfaces/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { ItemFormComponent } from '../../shared/item-form/item-form.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule, ItemFormComponent, ReactiveFormsModule, MatTableModule, MatIconModule, MatButtonModule, ItemFormComponent
  ],
  template: `
    <h5>Cadastro de categorias</h5>
    <app-item-form 
      [formGroup]="categoriaForm" 
      [itemType]="'categoria'"
      (formSubmit)="onSave()">
    </app-item-form>

    <h5>Lista de categorias</h5>
    <table mat-table [dataSource]="categorias" class="mat-elevation-z8">
      <ng-container matColumnDef="nome">
        <th mat-header-cell *matHeaderCellDef> Nome </th>
        <td mat-cell *matCellDef="let categoria"> {{categoria.nome}} </td>
      </ng-container>

      <ng-container matColumnDef="descricao">
        <th mat-header-cell *matHeaderCellDef> Descrição </th>
        <td mat-cell *matCellDef="let categoria"> {{categoria.descricao}} </td>
      </ng-container>

      <ng-container matColumnDef="acoes">
        <th mat-header-cell *matHeaderCellDef> Ações </th>
        <td mat-cell *matCellDef="let categoria">
          <button mat-icon-button (click)="onEdit(categoria)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="onDelete(categoria.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    `,
  styleUrl: './categorias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent {
  private fb = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);

  categoriaForm: FormGroup = this.fb.group({
    nome: [''],
    descricao: [''],
  });

  categorias = this.categoriasService.listarCategorias();

  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];

  onSave(): void {
    this.categoriasService.adicionarCategoria(this.categoriaForm.value);
    this.categorias = this.categoriasService.listarCategorias();
  }

  onEdit(categoria: Categoria): void {
    this.categoriaForm.patchValue(categoria);
  }

  onDelete(id: number): void {
    this.categoriasService.deleteCategoria(id);
    this.categorias = this.categoriasService.listarCategorias();
  }
}
