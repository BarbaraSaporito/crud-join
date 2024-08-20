import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private produtos: Produto[] = [
    { id: 1, nome: 'Smartphone', descricao: 'Celular Android', preco: 2000, categoriaId: 1 },
    { id: 2, nome: 'Calça Jeans', descricao: 'Calça confortável', preco: 150, categoriaId: 2 },
  ];

  listarProdutos(): Produto[] {
    return [...this.produtos];
  }

  listarProdutoById(id: number): Produto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  adicionarProduto(produto: Omit<Produto, 'id'>): void {
    this.produtos.push({ ...produto, id: this.produtos.length + 1 });
  }

  atualizarProduto(id: number, atualizarProduto: Omit<Produto, 'id'>): void {
    const index = this.produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      this.produtos[index] = { ...atualizarProduto, id };
    }
  }

  deleteProduto(id: number): void {
    this.produtos = this.produtos.filter(produto => produto.id !== id);
  }
}
