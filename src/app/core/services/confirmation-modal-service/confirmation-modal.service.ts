import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationModalService {
  constructor(private dialog: MatDialog) {}

  open(config: { title: string; description: string; type?: 'success' | 'danger' }) {
    return this.dialog
      .open(ConfirmationModalComponent, {
        data: config,
      })
      .afterClosed();
  }
}
