import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LifestyleFormComponent } from '../../components/lifestyle/lifestyle-form/lifestyle-form.component';
import { LifestyleInfoComponent } from '../../components/lifestyle/lifestyle-info/lifestyle-info.component';
import { LifeStyleData, SectionEnum } from '../../core/interfaces/lifestyle';
import { LifestyleService } from '../../core/services/lifestyle/lifestyle.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

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
  private lifestyleService = inject(LifestyleService);
  private toastr = inject(ToastrService);

  loading = signal(false);

  lifestyleData: LifeStyleData = {};

  ngOnInit(): void {
    this.getLifeStyleData();
  }

  private getLifeStyleData() {
    this.loading.set(true);

    this.lifestyleService.get().subscribe({
      next: (res) => {
        if (res.success) {
          this.lifestyleData = res.data;
          this.loading.set(false);
        }
      },
      error: (err) => {
        console.log('Error getting lifestyle data', err);
        this.loading.set(false);
      },
    });
  }

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

  editSection(section: SectionEnum) {
    this.activeSection = section;
  }

  save() {
    const payload = this.lifestyleForm.value;

    this.lifestyleForm.disable();

    this.lifestyleService
      .update(payload)
      .pipe(finalize(() => this.lifestyleForm.enable()))
      .subscribe({
        next: (res) => {
          if (res.success) {
            const message = res?.message || 'Lifestyle info updated successfully.';
            this.toastr.success(message);
            this.getLifeStyleData();
          }
        },
        error: (err) => {
          if (!err?.error?.success) {
            const message = err?.error?.message || 'Failed to update lifestyle info.';
            this.toastr.error(message);
          }
        },
      });
  }
}
