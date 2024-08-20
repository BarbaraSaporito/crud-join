import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="submitForm()">
      <mat-form-field appearance="outline">
        <mat-label>{{ itemType }} nome</mat-label>
        <input matInput formControlName="nome" maxlength="100">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>{{ itemType }} descrição</mat-label>
        <input matInput formControlName="descricao" maxlength="150" >
      </mat-form-field>

      <mat-form-field *ngIf="itemType === 'produto'" appearance="outline">
        <mat-label>Preço</mat-label>
        <input matInput type="text" formControlName="preco" mask="separator.2" prefix="R$ " thousandSeparator="." maxlength="35"/>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit">Salvar</button>
    </form>
  `,
  styleUrls: ['./item-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormComponent {
  @Input() formGroup!: FormGroup;
  @Input() itemType!: string;
  @Output() formSubmit = new EventEmitter<void>();

  submitForm(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formSubmit.emit();
    }
  }
}
