import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { finalize, forkJoin } from 'rxjs';
import { ICard } from '../../core/interfaces/card';
import { CardService } from '../../core/services/card/card.service';
import { QrCodeService } from '../../core/services/qr-code/qr-code.service';

@Component({
  selector: 'app-sal-card',
  imports: [MatButtonModule, DatePipe, CommonModule],
  templateUrl: './sal-card.html',
  styleUrl: './sal-card.css',
})
export class SalCard implements OnInit {
  private qrCodeService = inject(QrCodeService);
  private sanitizer = inject(DomSanitizer);
  private cardService = inject(CardService);

  qrCodeUrl!: SafeUrl;
  loading = signal(false);
  cardData = signal<any>(null);

  ngOnInit(): void {
    this.loading.set(true);

    forkJoin({
      card: this.cardService.get(),
      qr: this.qrCodeService.get(),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(({ card, qr }) => {
        if (card.success) {
          this.cardData.set(this.mapPatientCard(card.data));
        }

        if (qr.success) {
          this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(qr.data.qrCodeData);
        }
      });
  }

  formatList(items: string[], maxChars = 45): string {
    if (!items || items.length === 0) return '';
    const text = items.join(', ');
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  }

  private mapPatientCard(data: ICard) {
    return {
      patientName: data.patientName,

      allergies: (data.allergies ?? []).map((a: { name: string }) => a.name),

      medications: (data.medications ?? []).map((m: { name: string }) => m.name),

      conditions: (data.conditions ?? []).map((c: { name: string }) => c.name),

      doctors: (data.doctors ?? [])
        .filter((d: any) => d.status === 'current')
        .map((d: { name: string }) => d.name),

      hospitals: (data.hospitals ?? [])
        .filter((h: any) => h.status === 'active')
        .map((h: { name: string }) => h.name),

      bloodType: data.bloodType,
      dateOfBirth: data.dateOfBirth,
      organDonor: data.organDonor,
      isSmoker: data.isSmoker,
      updatedAt: data.updatedAt,
      ekg: data.ekg,

      emergencyContact: data.emergencyContacts?.length
        ? {
            name: data.emergencyContacts[0].name,
            phone: data.emergencyContacts[0].phone,
            relation: data.emergencyContacts[0].relation,
          }
        : null,
    };
  }

  downloadCard() {
    const element = document.getElementById('medical-card');
    if (!element) return;

    const printWindow = window.open('', '_blank', 'width=800,height=500');
    if (!printWindow) return;

    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((link) => link.outerHTML)
      .join('\n');

    const styleTags = Array.from(document.querySelectorAll('style'))
      .map((style) => style.outerHTML)
      .join('\n');

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        ${linkTags}
        ${styleTags}
        <style>
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          
          body { 
            margin: 0; 
            padding: 32px 0 0 32px; 
            background: white;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
          }

          /* Override w-full so card uses its natural size */
         #medical-card {
          width: 450px !important;
          min-width: unset !important;
          max-width: unset !important;
          aspect-ratio: 1.6 / 1 !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          border: 1px solid #9ca3af !important;
          margin: 32px 0 0 32px !important;  /* top | right | bottom | left */
        }

          @page { 
            size: A4; 
            margin: 0; 
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 300);
    };
  }
}
