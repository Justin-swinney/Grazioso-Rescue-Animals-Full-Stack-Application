/**
 * Service for Sanitization of user input
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Injectable, SecurityContext} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  constructor(private domSanitizer: DomSanitizer) { }

  sanitizeInput(input: string): string {
   return this.domSanitizer.sanitize(SecurityContext.HTML, input) || '';
  }

  sanitizeUsername(username: string): string {
    return username.trim();
  }

  sanitizePassword(password: string): string {
    return password.trim();
  }

  sanitizeEmail(email: string): string {
    return email.trim();
  }
}
