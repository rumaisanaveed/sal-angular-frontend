import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-upload',
  imports: [MatIconModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  @Input() label = 'Upload Image';

  @Input() preview: string | ArrayBuffer | null = null;

  @Input() placeholderTitle = 'Upload Image';

  @Input() placeholderDescription = 'Upload image file';

  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    this.fileSelected.emit(file);
  }
}
