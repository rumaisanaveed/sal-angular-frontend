import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { Allergies } from './pages/allergies/allergies';
import { Medications } from './pages/medications/medications';
import { Conditions } from './pages/conditions/conditions';
import { Procedures } from './pages/procedures/procedures';
import { Doctors } from './pages/doctors/doctors';
import { Hospitals } from './pages/hospitals/hospitals';
import { Lifestyle } from './pages/lifestyle/lifestyle';
import { History } from './pages/history/history';
import { Insurance } from './pages/insurance/insurance';
import { SalCard } from './pages/sal-card/sal-card';
import { Settings } from './pages/settings/settings';
import { Care } from './pages/care/care';

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
        path: 'care',
        component: Care,
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
        path: 'history',
        component: History,
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
