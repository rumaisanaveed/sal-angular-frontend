import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="class" class="px-3 py-1 rounded-full text-sm">
      {{ label }}
    </span>
  `,
})
export class ChipComponent {
  @Input() label = '';
  @Input() class = '';
}
