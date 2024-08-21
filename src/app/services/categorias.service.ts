import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Categoria } from "../interfaces/categoria";

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private categoriasSubject = new BehaviorSubject<Categoria[]>([
    { id: 1, nome: 'Eletrônicos', descricao: 'Gadgets e dispositivos' },
    { id: 2, nome: 'Roupas', descricao: 'Vestuário e acessórios' },
  ]);
  
  categorias$ = this.categoriasSubject.asObservable();

  listarCategorias(): Observable<Categoria[]> {
    return this.categorias$;
  }

  listarCategoriaById(id: number): Categoria | undefined {
    return this.categoriasSubject.getValue().find(categoria => categoria.id === id);
  }

  adicionarCategoria(categoria: Omit<Categoria, 'id'>): void {
    const categorias = [...this.categoriasSubject.getValue(), { ...categoria, id: this.categoriasSubject.getValue().length + 1 }];
    this.categoriasSubject.next(categorias);
  }

  atualizarCategoria(categoria: Categoria): void {
    const categorias = this.categoriasSubject.getValue().map(c => c.id === categoria.id ? categoria : c);
    this.categoriasSubject.next(categorias);
  }

  deleteCategoria(id: number): void {
    const categorias = this.categoriasSubject.getValue().filter(categoria => categoria.id !== id);
    this.categoriasSubject.next(categorias);
  }
}
