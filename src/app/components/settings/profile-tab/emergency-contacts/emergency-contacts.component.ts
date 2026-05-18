import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-emergency-contacts',
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  templateUrl: './emergency-contacts.component.html',
  styleUrl: './emergency-contacts.component.css',
})
export class EmergencyContactsComponent {
  @Input() formGroup!: FormGroup;
  @Input() contacts!: FormArray;
  @Output() onAddContact = new EventEmitter();
  @Output() onRemoveContact = new EventEmitter();

  removeContact(index: number) {
    this.onRemoveContact.emit(index);
  }

  addContact() {
    this.onAddContact.emit();
  }
}
