import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="variantClass" class="px-3 py-1 rounded-full text-sm block">
      {{ label }}
    </span>
  `,
})
export class ChipComponent {
  @Input() label = '';

  @Input() variant: 'green' | 'blue' | 'red' | 'yellow' = 'blue';

  get variantClass() {
    switch (this.variant) {
      case 'green':
        return 'bg-green-100 text-green-700';
      case 'red':
        return 'bg-red-100 text-red-700';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  }
}
