import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyTableComponent } from './allergy-table.component';

describe('AllergyTableComponent', () => {
  let component: AllergyTableComponent;
  let fixture: ComponentFixture<AllergyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergyTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllergyTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
