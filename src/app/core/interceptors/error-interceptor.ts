import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from '@relynn/ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    tap((event) => {
  if (event instanceof HttpResponse && req.method !== 'GET') {
    const body = event.body as { message?: string } | null;
    const message = body?.message || 'Done successfully';
    toastrService.success(message, 'Success');
  }
}),
    catchError((err: HttpErrorResponse) => {
      const message =
        err.error?.message ||
        err.message ||
        'Something went wrong. Please try again!';

      toastrService.error(message, 'Error');

      return throwError(() => err);
    })
  );
};