/**
 *
 * Filter Component manages the creation of the filter items and emitting events / resetting.
 *
 * @author Justin Swinney
 * @Date 4/1/2024
 * @version 1.0
 *
 * */


import {Component, EventEmitter, Output} from '@angular/core';
import {TitleCasePipe} from "@angular/common";


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() updateFilters = new EventEmitter<any>();
  @Output() resetSearch = new EventEmitter<void>();

  /* Default filter selection values */
  selectedAnimalType: string = 'Animal Type';
  selectedRescueType: string = 'Rescue Type';
  selectedReservationStatus: string = 'Reservation Status';

  /* Emit filter update event */
  emitFilters() {
    this.updateFilters.emit({
      animalType: this.selectedAnimalType,
      rescueType: this.selectedRescueType,
      reservationStatus: this.selectedReservationStatus
    });
  }

  /* Reset filters and emit search upon reset button pressed */
  resetFilters() {
    this.selectedAnimalType = 'Animal Type';
    this.selectedRescueType = 'Rescue Type';
    this.selectedReservationStatus = 'Reservation Status';
    this.emitFilters();
    this.resetSearch.emit();
  }
}
