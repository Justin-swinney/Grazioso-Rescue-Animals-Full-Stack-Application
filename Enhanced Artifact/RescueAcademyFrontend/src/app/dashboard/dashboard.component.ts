/**
 * Dashboard component is the parent to all dashboard items and creates the layout and contains shared logic
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchComponent} from "./components/search/search.component";
import {SortComponent} from "./components/sort/sort.component";
import {RescueAnimalTableComponent} from "./components/rescue-animal-table/rescue-animal-table.component";
import {RescueAnimal} from "../shared/models/rescue-animal";
import {RescueAnimalService} from "../shared/services/rescue-animal-service";
import {FilterComponent} from "./components/filter/filter.component";
import {FormsModule} from "@angular/forms";
import {TableNavigationComponent} from "./components/table-navigation/table-navigation.component";

/* Filter Interface for type safety */
interface Filters {
  animalType: string;
  rescueType: string;
  reservationStatus: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FilterComponent,
    SearchComponent,
    RescueAnimalTableComponent,
    FormsModule,
    TableNavigationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tableTitle: string = 'Rescue Animals';
  rescueAnimals: RescueAnimal[] = []; // Original array , No Filtering will be applied to this array, used to reset filtered array to unfiltered.
  filteredRescueAnimals: RescueAnimal[] = []; // Filtered array to apply filters, sorts, searches.
  currentFilters: Filters = {animalType: '', rescueType: '', reservationStatus: ''};
  currentSearchTerm: string = '';
  currentPage: number = 1;
  /* Reference other components */
  @ViewChild(SearchComponent) searchComponentRef?: SearchComponent;
  @ViewChild(SortComponent) sortComponentRef?: SortComponent;
  @ViewChild(RescueAnimalTableComponent) rescueAnimalTableComponentRef?: RescueAnimalTableComponent;

  /* Constructor with rescueAnimalService parameter for fetching rescue animal data. */
  constructor(private rescueAnimalService: RescueAnimalService) {
    this.fetchRescueAnimals();
  }

  private _animalsPerPage: number = 10;

  get animalsPerPage(): number {
    return this._animalsPerPage;
  }

  set animalsPerPage(value: number) {
    this._animalsPerPage = value;
    this.currentPage = 1;
    this.applyFiltersAndSearch();
  }

  /* Calculate total number of pages needed for rescue animal table pagination. */
  get totalPages(): number {
    return Math.ceil(this.filteredRescueAnimals.length / this.animalsPerPage);
  }

  ngOnInit(): void {
    this.fetchRescueAnimals();
  }

  /* Fetch list of rescue animals from service class  */
  fetchRescueAnimals() {
    this.rescueAnimalService.getAllAnimals().subscribe(animals => {
      this.rescueAnimals = animals; // Fetch updates and Original filter information and store in rescueAnimals array.
      this.filteredRescueAnimals = [...this.rescueAnimals]; // Create copy of filtered array.
    });
  }

  /* Update filters and applies all (filters & search filters). */
  updateFilters(filters: Filters) {
    this.currentFilters = {
      animalType: filters.animalType !== 'Animal Type' ? filters.animalType : '',
      rescueType: filters.rescueType !== 'Rescue Type' ? filters.rescueType : '',
      reservationStatus: filters.reservationStatus !== 'Reservation Status' ? filters.reservationStatus : ''
    };
    this.currentPage = 1;
    this.applyFiltersAndSearch();
  }

  /* Search current data and apply filters */
  searchCurrentList(searchTerm: string) {
    this.currentSearchTerm = searchTerm.trim().toLowerCase();
    this.currentPage = 1;
    this.applyFiltersAndSearch();
  }

  /* Filter and Search Algorithm */
  applyFiltersAndSearch() {
    /* Filter based on current searchTerm */
    let filteredList = this.rescueAnimals.filter(animal => {
      return animal.name?.toLowerCase().includes(this.currentSearchTerm) ||
        animal.animalType?.toLowerCase().includes(this.currentSearchTerm) ||
        animal.rescueType?.toLowerCase().includes(this.currentSearchTerm) ||
        animal.gender?.toLowerCase().startsWith(this.currentSearchTerm) ||
        animal.breed?.toLowerCase().startsWith(this.currentSearchTerm) ||
        animal.species?.toLowerCase().startsWith(this.currentSearchTerm) ||
        animal.inServiceLocation?.toLowerCase().includes(this.currentSearchTerm);
    });
    /* If filters are applied filter list */
    if (this.currentFilters.animalType || this.currentFilters.rescueType || this.currentFilters.reservationStatus) {
      filteredList = filteredList.filter(animal => {
        return (!this.currentFilters.animalType || animal.animalType === this.currentFilters.animalType) &&
          (!this.currentFilters.rescueType || animal.rescueType === this.currentFilters.rescueType) &&
          (!this.currentFilters.reservationStatus || (this.currentFilters.reservationStatus === 'Reserved' && animal.reserved) || (this.currentFilters.reservationStatus === 'Available' && !animal.reserved));
      });
    }
    this.rescueAnimalTableComponentRef?.resetSort(); // if filters (search or filters) are applied reset sorts.
    this.filteredRescueAnimals = filteredList; // Update array with filters applied.
  }

  /* Handle page change events */
  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  /* Reset filters and update data displayed. */
  onResetAll() {
    this.filteredRescueAnimals = [...this.rescueAnimals];
    this.searchComponentRef?.resetSearch();
    this.rescueAnimalTableComponentRef?.resetSort();
    this.currentSearchTerm = '';
    this.currentFilters = {animalType: '', rescueType: '', reservationStatus: ''};
    this.applyFiltersAndSearch();
  }
}


