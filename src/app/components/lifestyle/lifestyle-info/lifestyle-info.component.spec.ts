import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestyleInfoComponent } from './lifestyle-info.component';

describe('LifestyleInfoComponent', () => {
  let component: LifestyleInfoComponent;
  let fixture: ComponentFixture<LifestyleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifestyleInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LifestyleInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
