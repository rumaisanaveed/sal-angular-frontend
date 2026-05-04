import { Component, Input, Output, EventEmitter } from '@angular/core';
import { INPUT_MODES, InputMode, InputModeEnum } from '../../core/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mode-switch-card',
  templateUrl: './mode-switch-card.component.html',
  imports: [CommonModule],
})
export class ModeSwitchCardComponent {
  @Input() title = '';
  @Input() subtitle = '';

  @Input() mode: InputModeEnum = InputModeEnum.Search;
  @Output() modeChange = new EventEmitter<InputModeEnum>();

  modes = INPUT_MODES;

  switchMode(value: InputModeEnum) {
    this.mode = value;
    this.modeChange.emit(value);
  }
}
