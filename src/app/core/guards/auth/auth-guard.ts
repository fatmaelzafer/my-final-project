import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const url = `/${route.routeConfig?.path}`;
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformid = inject(PLATFORM_ID);
  
    if (isPlatformBrowser(platformid)) {
      const token = localStorage.getItem('userToken')!;
      try {
        jwtDecode(token);
        return true;
      } catch (error) {
        router.navigate(['/login']);
        return false;
      }

    }
  
  return true;
};
