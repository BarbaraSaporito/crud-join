import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
            <input matInput formControlName="usuario">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput type="senha" formControlName="senha">
          </mat-form-field>
          <button mat-flat-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
        </form>
      </mat-card-content>
    </mat-card>  
  `,
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, senha } = this.loginForm.value;
      console.log(`Usuario: ${usuario}, Senha": ${senha}`);
 }
  }
}