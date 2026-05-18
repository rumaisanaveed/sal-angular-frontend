import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceEditFormComponent } from './insurance-edit-form.component';

describe('InsuranceEditFormComponent', () => {
  let component: InsuranceEditFormComponent;
  let fixture: ComponentFixture<InsuranceEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceEditFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
