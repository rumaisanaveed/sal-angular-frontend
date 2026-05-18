import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-insurance-view-mode',
  imports: [CommonModule],
  templateUrl: './insurance-view-mode.component.html',
  styleUrl: './insurance-view-mode.component.css',
})
export class InsuranceViewModeComponent {
  @Input() data!: {
    provider: string;
    state?: string;
    memberId: string;
    showState?: boolean;
  };
}
