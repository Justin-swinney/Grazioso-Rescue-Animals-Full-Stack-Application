/**
 * Navigation bar logic, handles navigation, logging user out
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  navigateToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
      console.log('Successful navigation to dashboard page');
    }).catch(error => {
      console.error('Navigation to dashboard page failed (NAV BAR): ', error);
    });
  }

  navigateToIntake() {
    this.router.navigate(['newIntake']).then(() => {
      console.log('Successful navigation to intake page (NAV BAR): ');
    }).catch(error => {
      console.error('Navigation to intake page failed (NAV BAR): ', error);
    });
  }

  logoutUser() {
    this.navigateToLoginPage();
    this.authService.logout();
  }

  navigateToLoginPage() {
    this.router.navigate(['login']).then(() => {
      console.log('Successful navigation to login page (NAV BAR): ');
    }).catch(error => {
      console.error('Navigation to login page failed (NAV BAR): ', error);
    });
  }
}
