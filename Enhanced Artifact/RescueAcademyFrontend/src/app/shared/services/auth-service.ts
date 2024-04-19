/**
 * Service for handling authentication related functions (Login, Authorization, Register, Logout)
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 **/

import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {environmentProduction} from "../../../environments/environment.production";


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseUrl = `${environmentProduction.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Track authentication status
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() { }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  // Handle unauthorized access
  isUnauthorized() {
    sessionStorage.clear(); // Clear all items from session storage
    this.isAuthenticatedSubject.next(false); // Set authentication status to false
    this.router.navigate(['/login']).then(() => { // Navigate to login page to prevent further access of site
      console.log("Navigation to login page successful");
    }).catch(error => {
      console.log("Error navigating to login page", error);
    });
  }

  // Handle user login
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      map(response => {
        sessionStorage.setItem('authToken', response.token); // Store authentication token in session storage
        this.isAuthenticatedSubject.next(true); // Set authentication status
      }));
  }

  // Handle user login
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, {username, password, email}); // Send post request to spring boot service to process user registration info
  }

  // Handle user login
  logout() {
    sessionStorage.removeItem('jwtToken'); // Remove the JWT token from session storage.
    this.isAuthenticatedSubject.next(false); // Set authentication status
    this.isUnauthorized()
  }
}
