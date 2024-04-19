/**
 * Auth component is the parent that is home to all login, registration, password reset components
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import { Component } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
