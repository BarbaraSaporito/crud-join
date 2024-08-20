import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule
  ],
  template: `
      <mat-card>
      <mat-card-title>Bem vindo!</mat-card-title>
      <img src="./assets/img/join-logo-p.png" alt="Logo">      
      <mat-card-content>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Login</mat-label>
          <input matInput formControlName="usuario" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Senha</mat-label>
          <input matInput type="password" formControlName="senha" />
        </mat-form-field>
        <button mat-flat-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
        <div *ngIf="errorMessage()" class="error-message">{{ errorMessage() }}</div>
      </form>
      </mat-card-content>
    </mat-card>  
  `,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required],
  });

  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, senha } = this.loginForm.value;
      if (this.authService.login(usuario, senha)) {
        this.router.navigate(['home']);
      } else {
        this.errorMessage.set('Login ou senha inválidos');

      }
    }
  }
}