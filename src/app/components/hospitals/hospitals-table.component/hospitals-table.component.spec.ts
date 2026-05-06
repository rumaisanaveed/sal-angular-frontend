import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsTableComponent } from './hospitals-table.component';

describe('HospitalsTableComponent', () => {
  let component: HospitalsTableComponent;
  let fixture: ComponentFixture<HospitalsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
