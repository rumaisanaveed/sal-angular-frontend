import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-device-form',
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.css',
})
export class DeviceFormComponent {
  @Input() deviceForm!: FormGroup;
}
