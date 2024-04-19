/**
 * Register component handles registering user, verification of password matches.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth-service";
import {SanitizationService} from "../../../shared/services/sanitization-service";
import {NgIf} from "@angular/common";
import {InputValidation} from "../../../shared/services/input-validation";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    InputValidation,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmationPassword: string = '';
  email: string = '';
  errorMessage: string = '';
  usernameErrorMessage: string = '';
  passwordErrorMessage: string = '';
  confirmationPasswordErrorMessage: string = '';
  emailErrorMessage: string = '';
  usernameValidationErrorMessage: string = '';
  passwordValidationErrorMessage: string = '';
  confirmationPasswordValidationErrorMessage: string = '';
  emailValidationErrorMessage: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private sanitizationService: SanitizationService,
    private toastService: ToastService
  ) {
  }

  verifyPasswordMatch(): boolean {
    return this.password === this.confirmationPassword;
  }

  navigateToLogin() {
    this.router.navigate(['login']).then(() => {
      console.log('Successful navigation to login page');
    }).catch(error => {
      console.error('Navigation to login page failed ERROR: ', error);
    });
  }


  register(form: NgForm) {
    if (this.verifyPasswordMatch()) { // If passwords match sanitize user input and call service
      const sanitizedUsername = this.sanitizationService.sanitizeUsername(this.username);
      const sanitizedPassword = this.sanitizationService.sanitizePassword(this.password);
      const sanitizedEmail = this.sanitizationService.sanitizeEmail(this.email);

      this.authService.register(sanitizedUsername, sanitizedPassword, sanitizedEmail).subscribe({ // Call service with sanitized params
        next: (response) => {
          console.log('Registration Successful ', response);
          this.toastService.show('Registration Successful!', {
            delay: 3000,
            class: 'bg-success text-white'
          });
          form.resetForm();
          this.router.navigate(['login']).then(() => {
            console.log("Navigation to login page success")
          } );
        },
        error: (error) => {
          console.error('Registration Failed ', error);
          this.clearFieldErrors();
          if (error.error) {
            if (typeof error.error === 'object' && !Array.isArray(error.error)) {
              if (!('isRegistered' in error.error) && 'message' in error.error) {
                this.errorMessage = error.error.message;
              } else {
                Object.keys(error.error).forEach(fieldName => {
                  this.handleFieldError(fieldName, error.error[fieldName]);
                });
              }
            }
            else {
              this.errorMessage = 'An error occurred during registration.';
            }
          }
        }
      });
    }
  }

  handleFieldError(fieldName: string, message: string) {
    switch (fieldName) {
      case 'username':
        this.usernameErrorMessage = message;
        break;
      case 'password':
        this.passwordErrorMessage = message;
        break;
      case 'confirmationPassword':
        this.confirmationPasswordErrorMessage = message;
        break;
      case 'email':
        this.emailErrorMessage = message;
        break;
      default:
        this.errorMessage = message;
        break;
    }
  }

  handleValidationStatus(event: { fieldName: string, isValid: boolean }) {
    this.errorMessage = '';
    switch (event.fieldName) {
      case 'username':
        this.usernameValidationErrorMessage = event.isValid ? '' : 'No special characters allowed';
        break;
      case 'password':
        this.passwordValidationErrorMessage = event.isValid ? '' : 'Invalid password';
        break;
      case 'confirmationPassword':
        this.confirmationPasswordValidationErrorMessage = event.isValid ? '' : 'Passwords do not match';
        break;
      case 'email':
        this.emailValidationErrorMessage = event.isValid ? '' : 'Invalid email';
        break;
      default:
        break;
    }
  }

  clearFieldErrors() {
    this.usernameErrorMessage = '';
    this.passwordErrorMessage = '';
    this.confirmationPasswordErrorMessage = '';
    this.emailErrorMessage = '';
  }
}
