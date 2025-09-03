import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserStore } from '../store/user.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const users = inject(UserStore);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        users.reset();
        inject(Router).navigateByUrl('/login');
      }
      return throwError(() => err);
    })
  );
};
