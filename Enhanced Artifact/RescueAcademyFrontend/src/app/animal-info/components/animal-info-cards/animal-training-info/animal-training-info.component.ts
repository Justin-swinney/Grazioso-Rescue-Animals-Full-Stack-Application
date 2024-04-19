/**
 * Card component that holds animal training status based on id and data collected.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {AnimalTrainingStatusComponent} from "../../../../shared/components/animal-training-status/animal-training-status.component";
import {RescueAnimal} from "../../../../shared/models/rescue-animal";

@Component({
  selector: 'app-animal-training-info',
  standalone: true,
  imports: [
    AnimalTrainingStatusComponent,
    NgIf
  ],
  templateUrl: './animal-training-info.component.html',
  styleUrl: './animal-training-info.component.scss'
})
export class AnimalTrainingInfoComponent {
  @Input() animal: RescueAnimal | undefined;

  // Method to generate custom messages based on current animal training status
  getTrainingStatusMessage(trainingStatus: string | undefined, rescueType: string | undefined) {
    if (this.animal?.trainingStatus?.toLowerCase() == 'completed') {
      return (this.animal.name + " has successfully completed all " + this.animal.rescueType?.toLowerCase() + " training!")
    } else if (this.animal?.trainingStatus?.toLowerCase() == 'not started') {
      return (this.animal.name + " has not started " + this.animal.rescueType?.toLowerCase() + " training.")
    } else if (this.animal?.trainingStatus?.toLowerCase() == 'beginner') {
      return (this.animal.name + " is beginning the " + this.animal.rescueType?.toLowerCase() + " training.")
    } else if (this.animal?.trainingStatus?.toLowerCase() == 'intermediate') {
      return (this.animal.name + " is advancing the second stage of " + this.animal.rescueType?.toLowerCase() + " training.")
    } else if (this.animal?.trainingStatus?.toLowerCase() == 'advanced') {
      return (this.animal.name + " is advancing to the final stage of " + this.animal.rescueType?.toLowerCase() + " training.")
    } else {
      return ("Error retrieving training status");
    }
  }
}
