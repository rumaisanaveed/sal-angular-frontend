import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyFormComponent } from './allergy-form.component';

describe('AllergyFormComponent', () => {
  let component: AllergyFormComponent;
  let fixture: ComponentFixture<AllergyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllergyFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
