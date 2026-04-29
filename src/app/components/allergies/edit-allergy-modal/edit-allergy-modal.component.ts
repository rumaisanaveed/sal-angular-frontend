import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-allergy-modal',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit-allergy-modal.component.html',
  styleUrl: './edit-allergy-modal.component.css',
})
export class EditAllergyModalComponent {}
