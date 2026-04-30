import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-allergy-form',
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './allergy-form.component.html',
  styleUrl: './allergy-form.component.css',
})
export class AllergyFormComponent {
  @Input() allergyForm!: FormGroup;
}
