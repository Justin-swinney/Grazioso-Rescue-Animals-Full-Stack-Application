/**
 * HTTP interceptor function for adding authorization header to outgoing request
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 **/

import {HttpInterceptorFn} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {AuthService} from "./auth-service";
import {inject} from "@angular/core";

export const AuthTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Call authentication service to check authentication status
  const authToken = sessionStorage.getItem('authToken'); // Get authentication token from session storage
  /* Conditional statement to check if authentication token exist */
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(authReq).pipe( // Send cloned request to HTTP handler
      catchError((error) => {
        if (error.status == 401) { // Conditional statement if error status 401 (unauthorized) call authentication service isUnauthorized
          authService.isUnauthorized();
        }
        return throwError(() => error);
      })
    )
  }
  return next(req);
};
