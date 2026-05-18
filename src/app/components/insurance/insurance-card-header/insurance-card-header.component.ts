import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-insurance-card-header',
  imports: [MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './insurance-card-header.component.html',
  styleUrl: './insurance-card-header.component.css',
})
export class InsuranceCardHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() sectionKey: string = '';
  @Input() editingSection: string | null = null;

  @Output() edit = new EventEmitter<string>();

  get isEditing(): boolean {
    return this.editingSection === this.sectionKey;
  }

  onEdit(): void {
    this.edit.emit(this.sectionKey);
  }
}
