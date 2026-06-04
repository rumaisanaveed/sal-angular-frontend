import { inject, InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

export const AUTH_API_URL = new InjectionToken<string>('AUTH_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/auth`;
  },
});

export const PATIENTS_API_URL = new InjectionToken<string>('PATIENTS_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/patients`;
  },
});

export const QR_CODE_API_URL = new InjectionToken<string>('QR_CODE_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/qr-code`;
  },
});

export const ACCOUNT_API_URL = new InjectionToken<string>('ACCOUNT_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/account`;
  },
});

export const CONTACT_INFO_API_URL = new InjectionToken<string>('CONTACT_INFO_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/contact`;
  },
});

export const PROFILE_API_URL = new InjectionToken<string>('PROFILE_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/profile`;
  },
});

export const MEDICATIONS_API_URL = new InjectionToken<string>('MEDICATIONS_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/medications`;
  },
});

export const ALLERGIES_API_URL = new InjectionToken<string>('ALLERGIES_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/allergies`;
  },
});

export const PROCEDURES_API_URL = new InjectionToken<string>('PROCEDURES_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/medical-procedures`;
  },
});

export const HISTORY_API_URL = new InjectionToken<string>('HISTORY_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(API_URL);
    return `${api}/family-history`;
  },
});

export const DOCTORS_API_URL = new InjectionToken<string>('DOCTORS_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/doctors`;
  },
});

export const HOSPITALS_API_URL = new InjectionToken<string>('HOSPITALS_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/hospitals`;
  },
});

export const CONDITIONS_API_URL = new InjectionToken<string>('CONDITIONS_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/medical-conditions`;
  },
});

export const THERAPIES_API_URL = new InjectionToken<string>('THERAPIES_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/therapies`;
  },
});

export const DEVICES_API_URL = new InjectionToken<string>('DEVICES_API_URL', {
  providedIn: 'root',
  factory: () => {
    const api = inject(PATIENTS_API_URL);
    return `${api}/medical-devices`;
  },
});
