import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyTableComponent } from './therapy-table.component';

describe('TherapyTableComponent', () => {
  let component: TherapyTableComponent;
  let fixture: ComponentFixture<TherapyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TherapyTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TherapyTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
