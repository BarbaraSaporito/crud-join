import { Injectable, signal } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.isAuthenticated.set(this.authService.isLoggedIn());
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}