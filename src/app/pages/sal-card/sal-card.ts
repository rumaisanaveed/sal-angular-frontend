import { Component, inject, OnInit, signal } from '@angular/core';
import { QrCodeService } from '../../core/services/qr-code/qr-code.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sal-card',
  imports: [],
  templateUrl: './sal-card.html',
  styleUrl: './sal-card.css',
})
export class SalCard implements OnInit {
  private qrCodeService = inject(QrCodeService);
  private sanitizer = inject(DomSanitizer);

  qrCodeUrl!: SafeUrl;
  loading = signal(false);

  ngOnInit(): void {
    this.loadQrCode();
  }

  private loadQrCode() {
    this.loading.set(true);
    this.qrCodeService
      .get()
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(res.data.qrCodeData);
          }
        },
        error: (err) => {
          console.log('Failed to get qr code', err);
        },
      });
  }
}
