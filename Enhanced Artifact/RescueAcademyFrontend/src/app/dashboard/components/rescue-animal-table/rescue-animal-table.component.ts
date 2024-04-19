/**
 *
 * The Rescue Animal Table is a core component to the main goal and requirements of this application.
 * This component is responsible for displaying data, allowing navigation to the animal info page.
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 * */

import {Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {CommonModule} from "@angular/common";

import {Router} from "@angular/router";

import {FormsModule} from "@angular/forms";
import {SortComponent} from "../sort/sort.component";
import {RescueAnimal} from "../../../shared/models/rescue-animal";
import {
  AnimalTrainingStatusComponent
} from "../../../shared/components/animal-training-status/animal-training-status.component";
import {RescueAnimalService} from "../../../shared/services/rescue-animal-service";

@Component({
  selector: 'app-rescue-animal-table',
  standalone: true,
  imports: [CommonModule, AnimalTrainingStatusComponent, FormsModule, SortComponent],
  templateUrl: './rescue-animal-table.component.html',
  styleUrl: './rescue-animal-table.component.scss'
})
export class RescueAnimalTableComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() animalsPerPage: number = 10;
  @Input() filteredRescueAnimals: RescueAnimal[] = [];
  originalFilteredRescueAnimals: RescueAnimal[] = [];
  @ViewChildren(SortComponent) sortComponents!: QueryList<SortComponent>;
  currentSortKey: keyof RescueAnimal | null = null;
  currentSortOrder: 'asc' | 'desc' | 'none' = 'none';

  constructor(private rescueAnimalService: RescueAnimalService, private router: Router) {
    this.originalFilteredRescueAnimals = this.filteredRescueAnimals.slice();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filteredRescueAnimals']) {
      this.originalFilteredRescueAnimals = this.filteredRescueAnimals.slice();
    }
  }

  /* Open Animal Info page with data from rescue animal id. */
  openAnimalInfoPage(rescueAnimal: RescueAnimal) {
    if (rescueAnimal.id) { // If id exist
      this.rescueAnimalService.getAnimalById(rescueAnimal.id).subscribe((animal) => { // Call service and retrieve ID
        this.router.navigate(['animalInfo/', animal.id], { // Navigate to animal info route
          state: {animal}
        }).catch((error) => {
          console.error('Navigation error: ', error);
        });
      });
    } else {
      console.error("Animal ID not found")
    }
  }

  /* Sort data from ascending to descending and vise versa */
  onSort(sortData: { key: keyof RescueAnimal; order: 'asc' | 'desc' | 'none' }) {
    if (sortData.order === 'asc' || sortData.order === 'desc') {
      this.sortData(sortData.key, sortData.order);
      this.currentSortKey = sortData.key;
      this.currentSortOrder = sortData.order;
    }
    else { // Reset sorting and return filtered or unfiltered data
      this.resetSort();
      this.filteredRescueAnimals = this.originalFilteredRescueAnimals.slice();
      this.currentSortKey = null;
      this.currentSortOrder = 'none';
    }
  }

  sortData(key: keyof RescueAnimal, order: 'asc' | 'desc') {
    if (key === 'trainingStatus') {
      this.filteredRescueAnimals.sort((a, b) => this.trainingStatusSort(a, b, order));
    }
    else {
      this.filteredRescueAnimals.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }

    /* Reset sorting of other columns */
    this.sortComponents.forEach(sortComponent => {
      if (sortComponent.sortKey !== key) {
        sortComponent.resetSort();
      }
    });
  }

  trainingStatusSort(a: RescueAnimal, b: RescueAnimal, order: 'asc' | 'desc'): number {
    const orderArray = ['Not Started', 'Beginner', 'Intermediate', 'Advanced', 'Completed'];
    const aIndex = orderArray.indexOf(a.trainingStatus!);
    const bIndex = orderArray.indexOf(b.trainingStatus!);
    return order === 'asc' ? aIndex - bIndex : bIndex - aIndex;
  }

  resetSort() {
    this.sortComponents.forEach(sortComponent => {
      sortComponent.resetSort();
    });
  }
}
