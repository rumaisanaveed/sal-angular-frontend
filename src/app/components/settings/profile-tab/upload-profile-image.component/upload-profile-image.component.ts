import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-profile-image',
  imports: [MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './upload-profile-image.component.html',
  styleUrl: './upload-profile-image.component.css',
})
export class UploadProfileImageComponent {
  @Input() imageUrl: ArrayBuffer | string | null = '';

  @Output() onProfileChange = new EventEmitter<File>();

  handleProfileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    this.onProfileChange.emit(file);
  }
}
