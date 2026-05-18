import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-account-tab',
  imports: [MatTabsModule, MatInputModule],
  templateUrl: './account-tab.component.html',
  styleUrl: './account-tab.component.css',
})
export class AccountTabComponent {}
