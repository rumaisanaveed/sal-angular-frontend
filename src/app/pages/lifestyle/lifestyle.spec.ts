import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lifestyle } from './lifestyle';

describe('Lifestyle', () => {
  let component: Lifestyle;
  let fixture: ComponentFixture<Lifestyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lifestyle],
    }).compileComponents();

    fixture = TestBed.createComponent(Lifestyle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
