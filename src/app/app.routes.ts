import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { Allergies } from './pages/allergies/allergies';
import { Conditions } from './pages/conditions/conditions';
import { Doctors } from './pages/doctors/doctors';
import { Hospitals } from './pages/hospitals/hospitals';
import { Insurance } from './pages/insurance/insurance';
import { Lifestyle } from './pages/lifestyle/lifestyle';
import { LoginComponent } from './pages/login/login.component';
import { DevicesComponent } from './pages/medical-devices/devices.component';
import { Medications } from './pages/medications/medications';
import { Procedures } from './pages/procedures/procedures';
import { SalCard } from './pages/sal-card/sal-card';
import { Settings } from './pages/settings/settings';
import { SignupComponent } from './pages/signup/signup.component';
import { TherapiesComponent } from './pages/therapies/therapies.component';

export const routes: Routes = [
  {
    path: 'signup',
    // component: SignupComponent,
    loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'login',
    // component: LoginComponent,
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  // redirect to the allergies page when trying to visit the root url
  {
    path: '',
    redirectTo: 'allergies',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'allergies',
        // component: Allergies,
        loadComponent: () => import('./pages/allergies/allergies').then((m) => m.Allergies),
      },
      {
        path: 'medications',
        // component: Medications,
        loadComponent: () => import('./pages/medications/medications').then((m) => m.Medications),
      },
      {
        path: 'conditions',
        // component: Conditions,
        loadComponent: () => import('./pages/conditions/conditions').then((m) => m.Conditions),
      },
      {
        path: 'therapies',
        // component: TherapiesComponent,
        loadComponent: () =>
          import('./pages/therapies/therapies.component').then((m) => m.TherapiesComponent),
      },
      {
        path: 'devices',
        // component: DevicesComponent,
        loadComponent: () =>
          import('./pages/medical-devices/devices.component').then((m) => m.DevicesComponent),
      },
      {
        path: 'procedures',
        // component: Procedures,
        loadComponent: () => import('./pages/procedures/procedures').then((m) => m.Procedures),
      },
      {
        path: 'doctors',
        // component: Doctors,
        loadComponent: () => import('./pages/doctors/doctors').then((m) => m.Doctors),
      },
      {
        path: 'hospitals',
        // component: Hospitals,
        loadComponent: () => import('./pages/hospitals/hospitals').then((m) => m.Hospitals),
      },
      {
        path: 'lifestyle',
        // component: Lifestyle,
        loadComponent: () => import('./pages/lifestyle/lifestyle').then((m) => m.Lifestyle),
      },
      {
        path: 'insurance',
        // component: Insurance,
        loadComponent: () => import('./pages/insurance/insurance').then((m) => m.Insurance),
      },
      {
        path: 'sal-card',
        // component: SalCard,
        loadComponent: () => import('./pages/sal-card/sal-card').then((m) => m.SalCard),
      },
      {
        path: 'settings',
        // component: Settings,
        loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
      },
    ],
  },
];
