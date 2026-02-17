import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';
export const userAuthGuard: CanActivateFn = (route, state) => {
   const url = `/${route.routeConfig?.path}`;
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformid = inject(PLATFORM_ID);
  
    if (isPlatformBrowser(platformid)) {
      const token = localStorage.getItem('userToken')!;
      const url= localStorage.getItem('pageUrl')||'/home';
      try {
        jwtDecode(token);
        router.navigate([url]);
        return false;
      } catch (error) {
        
        return true;
      }

    }
  
  return true;
};
