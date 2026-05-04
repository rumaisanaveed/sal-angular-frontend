import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ChipComponent } from '../../chip/chip.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-therapies',
  imports: [MatInputModule, CommonModule, ReactiveFormsModule, ChipComponent, MatButtonModule],
  templateUrl: './therapies.component.html',
  styleUrl: './therapies.component.css',
})
export class TherapiesComponent {
  @Input() therapyForm!: FormGroup;
  @Input() therapies: string[] = [];
}
