import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Produto } from '../../interfaces/produto';
import { ProdutosService } from '../../services/produtos.service';
import { ItemFormComponent } from '../../shared/item-form/item-form.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    ItemFormComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutosComponent {
  private fb = inject(FormBuilder);
  private produtosService = inject(ProdutosService);

  produtoForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    preco: ['', [Validators.required, Validators.min(0.01)]],
  });

  produtos = this.produtosService.listarProdutos();

  displayedColumns: string[] = ['nome', 'descricao', 'preco', 'acoes'];

  onSave(): void {
    if (this.produtoForm.valid) {
      this.produtosService.adicionarProduto(this.produtoForm.value);
      this.produtos = this.produtosService.listarProdutos();
      this.produtoForm.reset();
    }
  }

  onEdit(produto: Produto): void {
    this.produtoForm.patchValue(produto);
  }

  onDelete(id: number): void {
    this.produtosService.deleteProduto(id);
    this.produtos = this.produtosService.listarProdutos();
  }
}
