/**
 * Setup for Bootstraps Pagination
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {RescueAnimal} from "../../../shared/models/rescue-animal";

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {

  @Input() sortKey?: keyof RescueAnimal;
  @Input() customSort?: (a: any, b: any, order: 'asc' | 'desc') => number;
  @Input() resetSortState: boolean = false;
  @Output() sort = new EventEmitter<{ key: keyof RescueAnimal; order: 'asc' | 'desc' | 'none'; customSortFunction?: (a: any, b: any, order: 'asc' | 'desc') => number }>();
  @Output() sortReset = new EventEmitter<void>();

  sortState: 'asc' | 'desc' | 'none' = 'none'; // Initial sorting state

  // Toggle sort states and emit sorting event
  toggleSort() {
    if (this.sortKey === 'trainingStatus' && this.customSort) {
      this.sortState = this.sortState === 'asc' ? 'desc' : this.sortState === 'desc' ? 'none' : 'asc';
      this.sort.emit({ key: this.sortKey as keyof RescueAnimal, order: this.sortState, customSortFunction: this.customSort});
    }
    else {
      this.sortState = this.sortState === 'asc' ? 'desc' : this.sortState === 'desc' ? 'none' : 'asc';
      this.sort.emit({key: this.sortKey as keyof RescueAnimal, order: this.sortState});
    }
  }

  // Reset sort states and emit
  resetSort() {
    this.sortState = 'none';
    this.sortReset.emit();
  }
}
