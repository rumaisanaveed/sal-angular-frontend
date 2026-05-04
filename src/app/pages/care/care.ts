import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TherapiesComponent } from '../../components/conditions/therapies/therapies.component';
import { DevicesComponent } from '../../components/conditions/devices/devices.component';

@Component({
  selector: 'app-care',
  imports: [TherapiesComponent, DevicesComponent],
  templateUrl: './care.html',
  styleUrl: './care.css',
})
export class Care {
  therapyForm!: FormGroup;
  deviceForm!: FormGroup;

  devices: string[] = [
    'Insulin Pump',
    'CPAP Machine',
    'Blood Pressure Monitor',
    'Glucose Meter',
    'Wheelchair',
    'Nebulizer',
    'Hearing Aid',
    'Pulse Oximeter',
    'ECG Monitor',
    'Infusion Pump',
  ];

  therapies: string[] = [
    'Physiotherapy',
    'Occupational Therapy',
    'Speech Therapy',
    'Cognitive Behavioral Therapy (CBT)',
    'Respiratory Therapy',
    'Chemotherapy',
    'Radiation Therapy',
    'Dialysis',
    'Hydrotherapy',
    'Massage Therapy',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.therapyForm = this.fb.group({
      therapy: ['', Validators.required],
    });
    this.deviceForm = this.fb.group({
      device: ['', Validators.required],
    });
  }
}
