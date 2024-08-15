import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>categorias works!</p>`,
  styleUrl: './categorias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent { }
