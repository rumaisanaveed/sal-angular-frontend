import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private dialogRef?: MatDialogRef<ModalComponent>;
  private dialog = inject(MatDialog);

  open(
    title: string,
    content: TemplateRef<any>,
    showButtons: boolean = true,
    isLoading?: boolean,
  ): MatDialogRef<ModalComponent> {
    this.dialogRef = this.dialog.open(ModalComponent, {
      data: { title, content, showButtons, isLoading },
    });

    return this.dialogRef;
  }

  close() {
    this.dialogRef?.close();
  }
}
