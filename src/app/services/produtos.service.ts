import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private produtosSubject = new BehaviorSubject<Produto[]>([
    { id: 1, nome: 'Smartphone', descricao: 'Celular Android', preco: 2000, categoriaId: 1 },
    { id: 2, nome: 'Calça Jeans', descricao: 'Calça confortável', preco: 150, categoriaId: 2 },
  ]);
  
  produtos$ = this.produtosSubject.asObservable();

  listarProdutos(): Observable<Produto[]> {
    return this.produtos$;
  }

  listarProdutoById(id: number): Produto | undefined {
    return this.produtosSubject.getValue().find(produto => produto.id === id);
  }

  adicionarProduto(produto: Omit<Produto, 'id'>): void {
    const produtos = [...this.produtosSubject.getValue(), { ...produto, id: this.produtosSubject.getValue().length + 1 }];
    this.produtosSubject.next(produtos);
  }

  atualizarProduto(produto: Produto): void {
    const produtos = this.produtosSubject.getValue().map(p => p.id === produto.id ? produto : p);
    this.produtosSubject.next(produtos);
  }

  deleteProduto(id: number): void {
    const produtos = this.produtosSubject.getValue().filter(produto => produto.id !== id);
    this.produtosSubject.next(produtos);
  }
}
