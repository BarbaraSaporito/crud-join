import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Relacionamento } from '../../interfaces/relacionamento';
import { CategoriasService } from '../../services/categorias.service';
import { ProdutosService } from '../../services/produtos.service';
import { RelacionamentoService } from '../../services/relacionamento.service';

@Component({
  selector: 'app-relacionamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './relacionamento.component.html',
  styleUrls: ['./relacionamento.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelacionamentoComponent {
  private fb = inject(FormBuilder);
  private relacionamentoService = inject(RelacionamentoService);
  private categoriasService = inject(CategoriasService);
  private produtosService = inject(ProdutosService);

  relacionamentoForm: FormGroup = this.fb.group({
    categoriaId: ['', Validators.required],
    produtoId: ['', Validators.required],
  });

  categorias = this.categoriasService.listarCategorias();
  produtos = this.produtosService.listarProdutos();
  relacionamentos = this.relacionamentoService.listarRelacionamentos();

  displayedColumns: string[] = ['categoria', 'produto', 'acoes'];

  onSave(): void {
    if (this.relacionamentoForm.valid) {
      this.relacionamentoService.adicionarRelacionamento(
        this.relacionamentoForm.value.categoriaId,
        this.relacionamentoForm.value.produtoId
      );
      this.relacionamentos = this.relacionamentoService.listarRelacionamentos();
      this.relacionamentoForm.reset();
    }
  }

  onDelete(rel: Relacionamento): void {
    this.relacionamentoService.deleteRelacionamento(rel.categoriaId, rel.produtoId);
    this.relacionamentos = this.relacionamentoService.listarRelacionamentos();
  }
}
