import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSwitchCardComponent } from './mode-switch-card.component';

describe('ModeSwitchCardComponent', () => {
  let component: ModeSwitchCardComponent;
  let fixture: ComponentFixture<ModeSwitchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeSwitchCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeSwitchCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
