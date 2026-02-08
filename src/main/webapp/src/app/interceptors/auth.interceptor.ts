import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt_token');

  if (token && !req.url.includes('/api/auth/')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error.status === 401) {
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('username');
          router.navigate(['/login']);
        }
      }
    })
  );
};
