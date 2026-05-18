import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-contact-info-tab',
  imports: [MatTabsModule, MatInputModule, MatSlideToggleModule],
  templateUrl: './contact-info-tab.component.html',
  styleUrl: './contact-info-tab.component.css',
})
export class ContactInfoTabComponent {}
