import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { SpinnerService } from './spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.show();
  return next(req).pipe(
    finalize(() => spinnerService.hide())
  );
};