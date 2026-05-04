import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-item',
  imports: [CommonModule],
  templateUrl: './selected-item.component.html',
  styleUrl: './selected-item.component.css',
})
export class SelectedItemComponent {
  @Input() item: { title: string; subtitle: string } = {
    title: '',
    subtitle: '',
  };
}
