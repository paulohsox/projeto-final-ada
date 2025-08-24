import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const username = authService.user();
  if (username && authService.isUserAdmin(username)) return true;
  return router.createUrlTree(['/login']);

};
