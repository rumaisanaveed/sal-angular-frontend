import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface InsuranceSummaryItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-insurance-summary',
  imports: [MatIconModule, CommonModule],
  templateUrl: './insurance-summary.component.html',
  styleUrl: './insurance-summary.component.css',
})
export class InsuranceSummaryComponent {
  @Input() items: InsuranceSummaryItem[] = [];
}
