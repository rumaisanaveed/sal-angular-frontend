import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsTableComponent } from './conditions-table.component';

describe('ConditionsTableComponent', () => {
  let component: ConditionsTableComponent;
  let fixture: ComponentFixture<ConditionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
