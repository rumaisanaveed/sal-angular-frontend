import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCardHeaderComponent } from './insurance-card-header.component';

describe('InsuranceCardHeaderComponent', () => {
  let component: InsuranceCardHeaderComponent;
  let fixture: ComponentFixture<InsuranceCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceCardHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceCardHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
