import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTabComponent } from './account-tab.component';

describe('AccountTabComponent', () => {
  let component: AccountTabComponent;
  let fixture: ComponentFixture<AccountTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
