/**
 * Routing configuration for components.
 *
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/


import { Routes } from '@angular/router';
import {AuthGuard} from "./shared/guards/auth-guard/auth.guard";
import {NoAuthGuard} from "./shared/guards/no-auth-guard/no-auth.guard";
import {AuthComponent} from "./auth/auth.component";
import {NotFoundPageComponent} from "./shared/components/not-found-page/not-found-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AnimalInfoComponent} from "./animal-info/animal-info.component";
import {NewIntakeComponent} from "./new-intake/new-intake.component";
import {RegisterComponent} from "./auth/components/register/register.component";

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},       // Route URL /dashboard to DashboardLayoutComponent, This is the main hub for employee interaction on this application.
  {path: 'login', component: AuthComponent, canActivate: [NoAuthGuard]},              // Route URL /login to AuthComponent, parent view to allow user login, accesses to register route.
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},       // Route URL /register to RegisterComponent, Allows access for user creation, unprotected route.
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},                            // Redirect all traffic to dashboard, prevents access to login page without going through the proper sign out steps.
  {path: 'animalInfo/:id', component: AnimalInfoComponent, canActivate: [AuthGuard]}, // Route URL /animalInfo/:id to AnimalInfoComponent, Route when a row is selected from the dashboard page, pulls the particular animal ID and displays info.
  {path: 'newIntake', component: NewIntakeComponent, canActivate: [AuthGuard]},       // Route URL /newIntake to NewIntakeComponent, Route for creating new animals.
  {path: '404', component: NotFoundPageComponent, canActivate: [AuthGuard]},          // Route URL /404 to NotFoundPageComponent, Route to handle errors with URL if they occur.
  {path: '**', redirectTo: '/404'},                                                   // Route URL /404 to Ensure wild card is set to route all unknown routes.
];
