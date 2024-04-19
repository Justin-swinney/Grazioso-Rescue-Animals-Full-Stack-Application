/**
 * Ensures only authorized access is allowed to protected routes
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 **/

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth-service";


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) { // If user is authenticated allow access
    return true;
  } else {
    return router.createUrlTree(['/login']); // If user is not authenticated route to log in view.
  }
};
