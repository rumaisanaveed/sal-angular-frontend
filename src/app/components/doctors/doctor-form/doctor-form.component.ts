import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, CommonModule, MatRadioModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css',
})
export class DoctorFormComponent {
  @Input() form!: FormGroup;

  services = [
    {
      label: 'Cardiology',
      value: 'cardiology',
    },
    {
      label: 'Neuorology',
      value: 'neurology',
    },
    {
      label: 'Orthopedics',
      value: 'orthopedics',
    },
    {
      label: 'Pediatrics',
      value: 'pediatrics',
    },
    {
      label: 'General',
      value: 'general',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ];
}
