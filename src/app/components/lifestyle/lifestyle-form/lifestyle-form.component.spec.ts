import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestyleFormComponent } from './lifestyle-form.component';

describe('LifestyleFormComponent', () => {
  let component: LifestyleFormComponent;
  let fixture: ComponentFixture<LifestyleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifestyleFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LifestyleFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
