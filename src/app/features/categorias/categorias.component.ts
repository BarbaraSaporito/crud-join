import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent {
  private fb = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);

  categoriaForm: FormGroup = this.fb.group({
    id: [null], 
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
  });

  categorias$ = this.categoriasService.listarCategorias();

  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];

  onSave(): void {
    if (this.categoriaForm.valid) {
      const categoria = this.categoriaForm.value;
      if (categoria.id) {
        this.categoriasService.atualizarCategoria(categoria);
      } else {
        this.categoriasService.adicionarCategoria(categoria);
      }
      this.categoriaForm.reset();
    }
  }

  onEdit(categoria: Categoria): void {
    this.categoriaForm.patchValue(categoria);
  }

  onDelete(id: number): void {
    this.categoriasService.deleteCategoria(id);
  }
}
