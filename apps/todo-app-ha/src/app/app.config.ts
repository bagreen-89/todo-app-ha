import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { ENVIRONMENT_CONFIG, errorInterceptor } from '@todo-app-ha/helpers';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    {
      provide: ENVIRONMENT_CONFIG,
      useValue: environment,
    },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: true },
    },
  ],
};
