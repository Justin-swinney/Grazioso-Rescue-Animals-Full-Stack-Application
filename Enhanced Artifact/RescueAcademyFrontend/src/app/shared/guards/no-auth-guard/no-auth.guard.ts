/**
 * Prevention of authorized users access to certain routes while authorization status is true
 * This includes preventing authorized users from accessing /login or /register
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 **/

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth-service";


export const NoAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Check authorization status
  const router = inject(Router);

  if (!authService.isAuthenticated()) { // If user authentication status is false allow access
    return true;
  } else { // If user authentication status is true route to dashboard
    return router.createUrlTree(['/dashboard']);
  }
};
