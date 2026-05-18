import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountTabComponent } from '../../components/settings/account-tab/account-tab.component';
import { ContactInfoTabComponent } from '../../components/settings/contact-info-tab/contact-info-tab.component';
import { ProfileTabComponent } from '../../components/settings/profile-tab.component/profile-tab.component';

@Component({
  selector: 'app-settings',
  imports: [
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    AccountTabComponent,
    ContactInfoTabComponent,
    ProfileTabComponent,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {}
