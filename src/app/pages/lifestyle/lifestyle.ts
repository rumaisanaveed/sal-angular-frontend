import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lifestyle',
  imports: [MatInputModule, MatSelectModule, CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './lifestyle.html',
  styleUrl: './lifestyle.css',
})
export class Lifestyle {
  activeSection: 'lifestyle' | 'work' | 'exercise' | null = 'lifestyle';
  lifestyleForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.lifestyleForm = this.fb.group({
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
  }

  religionOptions = [
    { value: 'catholic', label: 'Catholic' },
    { value: 'protestant', label: 'Protestant' },
    { value: 'orthodox', label: 'Orthodox' },
    { value: 'baptist', label: 'Baptist' },
    { value: 'methodist', label: 'Methodist' },
    { value: 'lutheran', label: 'Lutheran' },
    { value: 'presbyterian', label: 'Presbyterian' },
    { value: 'episcopal', label: 'Episcopal' },
    { value: 'christianity', label: 'Christianity' },
    { value: 'islam', label: 'Islam' },
    { value: 'hinduism', label: 'Hinduism' },
    { value: 'buddhism', label: 'Buddhism' },
    { value: 'judaism', label: 'Judaism' },
    { value: 'sikhism', label: 'Sikhism' },
    { value: 'other', label: 'Other' },
  ];

  placeOfWorshipOptions = [
    { value: 'church', label: 'Church' },
    { value: 'mosque', label: 'Mosque' },
    { value: 'temple', label: 'Temple' },
    { value: 'synagogue', label: 'Synagogue' },
    { value: 'gurdwara', label: 'Gurdwara' },
    { value: 'shrine', label: 'Shrine' },
    { value: 'chapel', label: 'Chapel' },
    { value: 'cathedral', label: 'Cathedral' },
    { value: 'monastery', label: 'Monastery' },
    { value: 'home', label: 'Home' },
    { value: 'communityCenter', label: 'Community Center' },
    { value: 'other', label: 'Other' },
  ];

  maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' },
    { value: 'other', label: 'Other' },
  ];

  workStatusOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'retired', label: 'Retired' },
    { value: 'student', label: 'Student' },
    { value: 'self-employed', label: 'Self Employed' },
    { value: 'other', label: 'Other' },
  ];

  educationOptions = [
    { value: 'no formal education', label: 'No Formal Education' },
    { value: 'primary school', label: 'Primary School' },
    { value: 'secondary school', label: 'Secondary School' },
    { value: 'high school', label: 'High School' },
    { value: 'associate degree', label: 'Associate Degree' },
    { value: "bachelor's degree", label: "Bachelor's Degree" },
    { value: "master's degree", label: "Master's Degree" },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'other', label: 'Other' },
  ];

  occupationOptions = [
    { value: 'engineer', label: 'Engineer' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'business', label: 'Business' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
    { value: 'other', label: 'Other' },
  ];

  dietaryRoutineOptions = [
    { value: 'omnivore', label: 'Omnivore' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'dairy-free', label: 'Dairy Free' },
    { value: 'other', label: 'Other' },
  ];

  exerciseFrequencyOptions = [
    { value: 'never', label: 'Never' },
    { value: 'rarely', label: 'Rarely' },
    { value: '1-2 times per week', label: '1–2 Times Per Week' },
    { value: '3-4 times per week', label: '3–4 Times Per Week' },
    { value: '5+ times per week', label: '5+ Times Per Week' },
    { value: 'daily', label: 'Daily' },
    { value: 'other', label: 'Other' },
  ];

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

  editSection(section: any) {
    this.activeSection = section;
  }

  saveSection() {}
}
