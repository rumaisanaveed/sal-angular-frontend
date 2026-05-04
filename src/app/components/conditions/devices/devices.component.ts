import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChipComponent } from '../../chip/chip.component';

@Component({
  selector: 'app-devices',
  imports: [MatInputModule, CommonModule, ReactiveFormsModule, ChipComponent],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent {
  @Input() devices: string[] = [];
  @Input() form!: FormGroup;
}
