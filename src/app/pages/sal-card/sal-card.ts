import { Component, inject, OnInit } from '@angular/core';
import { QrCodeService } from '../../core/services/qr-code/qr-code.service';

@Component({
  selector: 'app-sal-card',
  imports: [],
  templateUrl: './sal-card.html',
  styleUrl: './sal-card.css',
})
export class SalCard implements OnInit {
  private qrCodeService = inject(QrCodeService);

  qrCodeUrl: string = '';

  ngOnInit(): void {
    this.loadQrCode();
  }

  private loadQrCode() {
    this.qrCodeService.get().subscribe({
      next: (res) => {
        if (res.success) {
          this.qrCodeUrl = res.data?.qrCodeData;
        }
      },
      error: (err) => {
        console.log('Failed to get qr code', err);
      },
    });
  }
}
