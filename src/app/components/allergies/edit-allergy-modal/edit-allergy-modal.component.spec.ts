import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllergyModalComponent } from './edit-allergy-modal.component';

describe('EditAllergyModalComponent', () => {
  let component: EditAllergyModalComponent;
  let fixture: ComponentFixture<EditAllergyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAllergyModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditAllergyModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
