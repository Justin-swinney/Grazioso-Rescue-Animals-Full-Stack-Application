/**
 * Animal status bar component used to display training status in appealing progress bar
 * This class handles conversion of string to percentage
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {RescueAnimal} from "../../models/rescue-animal";

// Mapping interface for training status
interface TrainingStatusMap {
  [key: string]: { percentage: string; class: string; };
}

@Component({
  selector: 'app-animal-training-status',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './animal-training-status.component.html',
  styleUrl: './animal-training-status.component.scss'
})
export class AnimalTrainingStatusComponent implements OnInit, OnChanges{
  @Input() animal?: RescueAnimal; // Input property for animal object
  @Input() trainingStatus: string | undefined; // Input property for training status
  percentage: string = '0%'; // Default percentage value for training status
  progressBarClass: string = 'bg-danger'; // Default style boostrap style for progress bar

  // Mapping training status to percentages
  private trainingStatusMapping: TrainingStatusMap = {
    'not started': {percentage: '0%', class: 'bg-danger'},
    'beginner': {percentage: '25%', class: 'bg-warning'},
    'intermediate': {percentage: '50%', class: 'bg-info'},
    'advanced': {percentage: '75%', class: 'bg-primary'},
    'completed': {percentage: '100%', class: 'bg-success'}
  };

  // Update progress bar on initialization
  ngOnInit(): void {
    this.updateProgressBar();
  }

  // Update progress bar on input changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trainingStatus']) {
      this.updateProgressBar();
    }
  }

  updateProgressBar():void {
    const {percentage, class: progressBarClass} = this.getTrainingStatusFromString(this.trainingStatus);
    this.percentage = percentage; // Update percentage
    this.progressBarClass = progressBarClass; // Assign class
  }

  getTrainingStatusFromString(trainingStatus: string | undefined): { percentage: string, class: string } {
    const statusKey = trainingStatus?.toLowerCase() || 'not started'; // Assign default training status string
    if (statusKey in this.trainingStatusMapping) { // Loop through mapping and return class and percentage based on statusKey (string assigned in mapping)
      return this.trainingStatusMapping[statusKey];
    }
    return {percentage: '0%', class: 'bg-danger'}; // Return default if nothing is found
  }
}
