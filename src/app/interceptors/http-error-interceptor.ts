import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ExceptionViewModel } from '../models/exception-view-model';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((errorResponse) => {
      if (errorResponse.error) {
        const error: ExceptionViewModel = errorResponse.error;
        if (error.title) {
          toastr.error(error.title, `${error.detail}`);
        }
        if (error.Errors && Array.isArray(error.Errors)) {
          error.Errors.forEach((e) => {
            e.Errors.forEach((msg) => {
              toastr.warning(`${msg}`);
            });
          });
        }
      } else {
        toastr.error('Bilinmeyen bir hata oluştu', 'Hata');
      }
      return throwError(() => errorResponse);
    })
  );
};
