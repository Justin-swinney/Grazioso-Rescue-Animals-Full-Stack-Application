/**
 * Angular configuration
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {ApplicationConfig, ErrorHandler} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthTokenInterceptor} from "./shared/services/auth-token-interceptor";
import {GlobalErrorHandler} from "./shared/utils/global-error-handler";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,),
    provideHttpClient(withInterceptors([AuthTokenInterceptor])),
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    provideAnimationsAsync('noop'),
  ]
};
