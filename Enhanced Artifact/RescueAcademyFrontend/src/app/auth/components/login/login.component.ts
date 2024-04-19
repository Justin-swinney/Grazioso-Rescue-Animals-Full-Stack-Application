/**
 * Handle login credentials, navigation to registration / password reset page
 *
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 * */

import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth-service";
import {SanitizationService} from "../../../shared/services/sanitization-service";
import {NgClass, NgIf} from "@angular/common";
import {InputValidation} from "../../../shared/services/input-validation";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    InputValidation
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizationService: SanitizationService
  ) { // Initialize login form with username and password from controls
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) { // If form is valid
      const credentials = {
        username: this.sanitizationService.sanitizeInput(this.loginForm.value.username), // Sanitize user input
        password: this.sanitizationService.sanitizeInput(this.loginForm.value.password) // Sanitize user input
      };
      this.authService.login(credentials) // Call auth service to authenticate user
        .subscribe({
          next: (data) => {
            this.router.navigate(['/dashboard']).then(() => { // If successful navigate to protected route
            }).catch((error) => {
              console.error('Navigation error: ', error);
            });
          },
          error: (error) => {
            this.errorMessage = 'Invalid username or password';
            this.resetErrorMessageAfterDelay(4000);
          }
        });
    }
  }

  // Reset error messages
  resetErrorMessageAfterDelay(delay: number) {
    setTimeout(() => {
      this.errorMessage = '';
    }, delay);
  }

  // Navigate to register route
  navigateToRegister() {
    this.router.navigate(['register']).then(() => {
      console.log('Successful navigation to registration page');
    }).catch(error => {
      console.error('Navigation to registration page failed ERROR: ', error);
    });
  }
}
