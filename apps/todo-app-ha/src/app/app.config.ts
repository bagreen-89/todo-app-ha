import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { ENVIRONMENT_CONFIG } from '@todo-app-ha/tokens';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: environment,
    },
  ],
};
