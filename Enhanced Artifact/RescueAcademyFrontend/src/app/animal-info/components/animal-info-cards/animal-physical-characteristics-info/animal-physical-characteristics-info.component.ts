/**
 * Card contains age, weight, gender, height, body length, tail length
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
  selector: 'app-animal-physical-characteristics-info',
  standalone: true,
  imports: [NgIf],
  templateUrl: './animal-physical-characteristics-info.component.html',
  styleUrl: './animal-physical-characteristics-info.component.scss'
})
export class AnimalPhysicalCharacteristicsInfoComponent {
  @Input() animal?: RescueAnimal;
}
