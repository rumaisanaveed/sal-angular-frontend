import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DevicesComponent } from '../../components/conditions/devices/devices.component';
import { TherapiesComponent } from '../../components/conditions/therapies/therapies.component';

@Component({
  selector: 'app-care',
  imports: [TherapiesComponent, DevicesComponent],
  templateUrl: './care.html',
  styleUrl: './care.css',
})
export class Care {
  private fb = inject(FormBuilder);

  therapyForm = this.fb.group({
    therapy: ['', Validators.required],
  });
  deviceForm = this.fb.group({
    device: ['', Validators.required],
  });

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
}
