import { inject, Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { Produto } from '../interfaces/produto';
import { Relacionamento } from '../interfaces/relacionamento';
import { CategoriasService } from './categorias.service';
import { ProdutosService } from './produtos.service';

@Injectable({
  providedIn: 'root',
})
export class RelacionamentoService {
  private categoriasService = inject(CategoriasService);
  private produtosService = inject(ProdutosService);
  private relacionamentos: Relacionamento[] = [];

  adicionarRelacionamento(categoriaId: number, produtoId: number): void {
    const produto = this.produtosService.listarProdutoById(produtoId);
    const produtoExistente = this.relacionamentos.find(rel => rel.produtoId === produtoId);

    if (produto && !produtoExistente) {
      this.relacionamentos.push({
        categoriaId, produtoId,
        id: 0
      });
    }
  }

  listarRelacionamentos(): { categoria: Categoria; produto: Produto }[] {
    return this.relacionamentos.map(rel => ({
      categoria: this.categoriasService.listarCategoriaById(rel.categoriaId)!,
      produto: this.produtosService.listarProdutoById(rel.produtoId)!,
    }));
  }

  deleteRelacionamento(categoriaId: number, produtoId: number): void {
    this.relacionamentos = this.relacionamentos.filter(
      rel => rel.categoriaId !== categoriaId || rel.produtoId !== produtoId
    );
  }

  listarRelacionamentosPorCategoria(categoriaId: number): Produto[] {
    const relacoes = this.relacionamentos.filter(rel => rel.categoriaId === categoriaId);
    return relacoes.map(rel => this.produtosService.listarProdutoById(rel.produtoId)!);
  }
}
