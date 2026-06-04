import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterButtonsComponent } from '../footer-buttons/footer-buttons.component';

@Component({
  selector: 'app-contact-info-tab',
  imports: [MatTabsModule, MatInputModule, MatSlideToggleModule, FooterButtonsComponent],
  templateUrl: './contact-info-tab.component.html',
  styleUrl: './contact-info-tab.component.css',
})
export class ContactInfoTabComponent {}
