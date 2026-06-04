import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LifeStyleData, SectionEnum } from '../../../core/interfaces/lifestyle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lifestyle-info',
  imports: [MatButtonModule],
  templateUrl: './lifestyle-info.component.html',
  styleUrl: './lifestyle-info.component.css',
})
export class LifestyleInfoComponent {
  @Input() data!: LifeStyleData;
  SectionEnum = SectionEnum;

  @Output() onEditSection = new EventEmitter();

  editSection(section: SectionEnum) {
    this.onEditSection.emit(section);
  }
}
