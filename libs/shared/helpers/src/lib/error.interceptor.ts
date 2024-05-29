import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { SnackService } from './snack.service';
import { inject } from '@angular/core';

/**
 * A very simple interceptor to inform about errors
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(SnackService);
  const showError = () =>
    snack.showMessage('❌ An error occured while processing the request.');

  return next(req).pipe(
    tap((event) => {
      if (event.type !== HttpEventType.Response) {
        return;
      }
      if (event.status >= 300) {
        showError();
      }
    }),
    catchError((err) => {
      showError();
      return of(err);
    })
  );
};
