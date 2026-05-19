import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LifestyleInfoComponent } from '../../components/lifestyle/lifestyle-info/lifestyle-info.component';
import { LifestyleFormComponent } from '../../components/lifestyle/lifestyle-form/lifestyle-form.component';
import { SectionEnum } from '../../core/interfaces/lifestyle';

@Component({
  selector: 'app-lifestyle',
  imports: [
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    LifestyleInfoComponent,
    LifestyleFormComponent,
  ],
  templateUrl: './lifestyle.html',
  styleUrl: './lifestyle.css',
})
export class Lifestyle {
  activeSection: SectionEnum = SectionEnum.Lifestyle;

  private fb = inject(FormBuilder);

  lifestyleForm = this.fb.group({
    // Lifestyle
    religion: [''],
    worship: [''],
    worshipName: [''],
    worshipAddress: [''],

    // Work & Home
    maritalStatus: [''],
    workStatus: [''],
    education: [''],
    occupation: [''],

    // Exercise & Diet
    diet: [''],
    exercise: [''],
  });

  lifestyleData = {
    // Lifestyle Information
    religion: 'Orthodox',
    worship: 'Church',
    worshipName: 'St. Mary Orthodox Church',
    worshipAddress: '12 Church Street, New York',

    // Work & Home
    maritalStatus: 'Married',
    workStatus: 'Employed',
    education: 'Bachelor’s Degree',
    occupation: 'Software Engineer',

    // Exercise & Diet
    diet: 'Balanced Diet',
    exercise: '3-4 times per week',
  };

  editSection(section: SectionEnum) {
    this.activeSection = section;
  }

  save() {
    console.log(this.lifestyleForm.value);
  }
}
