import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
  export class AuthService {
    private usuarios: Usuario[] = [{ usuario: 'admin', senha: 'admin' }];
    private autenticado = false;

    login(usuario: string, senha: string): boolean {
      const user = this.usuarios.find(u => u.usuario === usuario && u.senha === senha);
      this.autenticado = !!user;
      return this.autenticado;
    }

    logout(): void {
      this.autenticado = false;
    }

    isLoggedIn(): boolean {
      return this.autenticado;
    }
}
