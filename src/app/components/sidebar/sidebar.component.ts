import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatAnchor, MatButton, MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule, MatIcon, MatAnchor, MatButton],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuItems = [
    { label: 'Allergies', icon: 'eco', route: '/allergies' },
    {
      label: 'Medications',
      icon: 'medication',
      route: '/medications',
    },
    { label: 'Conditions', icon: 'healing', route: '/conditions' },
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
}
