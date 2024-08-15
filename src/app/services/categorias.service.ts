import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categorias: Categoria[] = [
    { id: 1, nome: 'Eletrônicos', descricao: 'Gadgets e dispositivos' },
    { id: 2, nome: 'Roupas', descricao: 'Vestuário e acessórios' }
  ];
  private proximoId = 1;

  listarCategorias(): Categoria[] {
    return this.categorias;
  }

  listarCategoriaById(id: number): Categoria | undefined {
    return this.categorias.find(categoria => categoria.id === id);
  }

  adicionarCategoria(categoria: Omit<Categoria, 'id'>): void {
    this.categorias.push({ ...categoria, id: this.proximoId++ });
  }

  atualizarCategoria(id: number, atualizarCategoria: Omit<Categoria, 'id'>): void {
    const index = this.categorias.findIndex(categoria => categoria.id === id);
    if (index !== -1) {
      this.categorias[index] = { ...atualizarCategoria, id };
    }
  }

  deleteCategoria(id: number): void {
    this.categorias = this.categorias.filter(categoria => categoria.id !== id);
  }
}

