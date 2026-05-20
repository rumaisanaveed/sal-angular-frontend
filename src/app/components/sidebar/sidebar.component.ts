import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, MatIcon, MatAnchor, MatButton],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isOpen: boolean = false;
  private router = inject(Router);
  @Output() close = new EventEmitter<void>();

  menuItems = [
    { label: 'Allergies', icon: 'eco', route: '/allergies' },
    {
      label: 'Medications',
      icon: 'medication',
      route: '/medications',
    },
    { label: 'Conditions', icon: 'monitor_heart', route: '/conditions' },
    { label: 'Care', icon: 'health_and_safety', route: '/care' },
    { label: 'Procedures', icon: 'healing', route: '/procedures' },
    { label: 'Doctors', icon: 'medical_services', route: '/doctors' },
    {
      label: 'Hospitals',
      icon: 'local_hospital',
      route: '/hospitals',
    },
    {
      label: 'Lifestyle',
      icon: 'directions_run',
      route: '/lifestyle',
    },
    { label: 'History', icon: 'history', route: '/history' },
    { label: 'Insurance', icon: 'security', route: '/insurance' },
    { label: 'SAL Card', icon: 'credit_card', route: '/sal-card' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
