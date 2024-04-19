/**
 * Card containing origin country and origin date.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, Input} from '@angular/core';

import {NgIf} from "@angular/common";
import {RescueAnimal} from "../../../../shared/models/rescue-animal";

@Component({
  selector: 'app-animal-origin-info',
  standalone: true,
    imports: [NgIf],
  templateUrl: './animal-origin-info.component.html',
  styleUrl: './animal-origin-info.component.scss'
})
export class AnimalOriginInfoComponent {
  @Input() animal?: RescueAnimal;
}
