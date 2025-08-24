import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isProtected = req.url.includes('/cart') || req.url.includes('/admin');

  if (!isProtected) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.token();
  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(authReq);
};
