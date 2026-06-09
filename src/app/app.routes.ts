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
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
        component: Allergies,
      },
      {
        path: 'medications',
        component: Medications,
      },
      {
        path: 'conditions',
        component: Conditions,
      },
      {
        path: 'therapies',
        component: TherapiesComponent,
      },
      {
        path: 'devices',
        component: DevicesComponent,
      },
      {
        path: 'procedures',
        component: Procedures,
      },
      {
        path: 'doctors',
        component: Doctors,
      },
      {
        path: 'hospitals',
        component: Hospitals,
      },
      {
        path: 'lifestyle',
        component: Lifestyle,
      },
      {
        path: 'insurance',
        component: Insurance,
      },
      {
        path: 'sal-card',
        component: SalCard,
      },
      {
        path: 'settings',
        component: Settings,
      },
    ],
  },
];
