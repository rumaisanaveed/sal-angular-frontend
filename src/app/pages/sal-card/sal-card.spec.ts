import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalCard } from './sal-card';

describe('SalCard', () => {
  let component: SalCard;
  let fixture: ComponentFixture<SalCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SalCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
