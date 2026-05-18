import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceViewModeComponent } from './insurance-view-mode.component';

describe('InsuranceViewModeComponent', () => {
  let component: InsuranceViewModeComponent;
  let fixture: ComponentFixture<InsuranceViewModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceViewModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceViewModeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
