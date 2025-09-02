import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, of } from 'rxjs';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);

  // Skip CSRF for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next(req);
  }

  // Skip if CSRF token already exists
  if (getCsrfToken()) {
    const csrfReq = req.clone({
      setHeaders: {
        'X-XSRF-TOKEN': getCsrfToken()!
      }
    });
    return next(csrfReq);
  }

  // Fetch CSRF token from Sanctum
  return http.get('/sanctum/csrf-cookie', { withCredentials: true }).pipe(
    switchMap(() => {
      const csrfReq = req.clone({
        setHeaders: {
          'X-XSRF-TOKEN': getCsrfToken()!
        }
      });
      return next(csrfReq);
    }),
    catchError(() => next(req))
  );
};

function getCsrfToken(): string | null {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}