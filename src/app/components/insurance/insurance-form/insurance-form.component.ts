import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insurance-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule],
  templateUrl: './insurance-form.component.html',
  styleUrl: './insurance-form.component.css',
})
export class InsuranceFormComponent {
  @Input({ required: true }) form!: FormGroup;

  @Input({ required: true }) insuranceControl!: string;

  @Input() stateControl?: string;

  @Input({ required: true }) memberIdControl!: string;

  @Input({ required: true }) label!: string;

  @Input() providers: any[] = [];

  @Input() showState = false;

  @Output() cancel = new EventEmitter<void>();

  @Output() save = new EventEmitter<void>();
}
