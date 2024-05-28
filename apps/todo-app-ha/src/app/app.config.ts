import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { ENVIRONMENT_CONFIG } from '@todo-app-ha/tokens';
import { environment } from '../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: environment,
    }, provideAnimationsAsync(),
  ],
};
