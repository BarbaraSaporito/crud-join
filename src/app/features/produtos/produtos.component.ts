import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>produtos works!</p>`,
  styleUrl: './produtos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutosComponent { }
