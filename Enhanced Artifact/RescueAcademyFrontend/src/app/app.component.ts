import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./shared/services/auth-service";
import {NavigationBarComponent} from "./shared/components/navigation-bar/navigation-bar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RescueAnimalAcademy';

  constructor(public authService: AuthService) {}
}
