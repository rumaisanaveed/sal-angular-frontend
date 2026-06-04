import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer-buttons',
  imports: [MatButtonModule],
  templateUrl: './footer-buttons.component.html',
  styleUrl: './footer-buttons.component.css',
})
export class FooterButtonsComponent {
  @Input() isDisabled = false;

  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  save() {
    this.onSave.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
