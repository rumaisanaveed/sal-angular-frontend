import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TemplateRef } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private dialogRef?: MatDialogRef<ModalComponent>;

  constructor(private dialog: MatDialog) {}

  open(title: string, content: TemplateRef<any>): MatDialogRef<ModalComponent> {
    this.dialogRef = this.dialog.open(ModalComponent, {
      data: { title, content },
    });

    return this.dialogRef;
  }

  close() {
    this.dialogRef?.close();
  }
}
