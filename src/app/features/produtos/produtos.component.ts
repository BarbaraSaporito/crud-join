import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
   
  ],
  template: `
    <section class="produtos-container">
      <h5>Cadastro de produto</h5>
      <app-item-form 
        [formGroup]="produtoForm" 
        [itemType]="'produto'"
        (formSubmit)="onSave()">
      </app-item-form>

      <h5>Lista de produtos</h5>
      <ul>
        <li *ngFor="let produto of produtos" (click)="onEdit(produto)">
          {{ produto.nome }} - {{ produto.descricao }} - {{ produto.preco | currency:'BRL' }}
        </li>
      </ul>
    </section>
  `,
  styleUrls: ['./produtos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProdutosComponent { 
  private fb = inject(FormBuilder);
  private produtosService = inject(ProdutosService);

  produtoForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    preco: ['', [Validators.required, Validators.min(0.01)]],
  });

  produtos: Produto[] = this.produtosService.listarProdutos();

  onSave(): void {
    this.produtosService.adicionarProduto(this.produtoForm.value);
    this.produtos = this.produtosService.listarProdutos(); 
  }

  onEdit(produto: Produto): void {
    this.produtoForm.patchValue(produto);
  }
}


