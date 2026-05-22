import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-therapy-form',
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './therapy-form.component.html',
  styleUrl: './therapy-form.component.css',
})
export class TherapyFormComponent {
  @Input() therapyForm!: FormGroup;
}
