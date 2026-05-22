import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapiesComponent } from './therapies.component';

describe('TherapiesComponent', () => {
  let component: TherapiesComponent;
  let fixture: ComponentFixture<TherapiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapiesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
