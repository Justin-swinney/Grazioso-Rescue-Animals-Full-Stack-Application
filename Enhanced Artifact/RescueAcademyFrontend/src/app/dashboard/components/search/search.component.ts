/**
 * Search bar component is responsible for searching the rescue animal table. This component is built off Angular Reactive Forms Module.
 * This component handles, input validation, detecting changes in the search bar, allowing Dashboard component to listen for character by character changes.
 *
 * @author Justin Swinney
 * @Date 4/1/2024
 * @version 1.0
 *
 * */

import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {InputValidationUtils} from "../../../shared/utils/input-validation-utils";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchForm: FormGroup; // Create Angular Reactive Form group for search bar.
  invalidInput: boolean = false;

  @Output() searchTermChange = new EventEmitter<string>(); // Emit changes from search bar to parent component.

  /* Detect input change and call onInput method */
  constructor(private fb: FormBuilder, private inputValidationUtils: InputValidationUtils) {
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
    this.searchForm.get('searchInput')?.valueChanges.subscribe((value) => {
      this.onInput(value);
    });
  }

  /* Handle input event and validate input.  */
  onInput(event: Event) {
    const inputElement = (event.target as HTMLInputElement);
    try {
      if (inputElement && inputElement.value) {
        const validValue = this.inputValidationUtils.validateStringAlphaAndApostropheOnly(inputElement.value);
        if (validValue !== inputElement.value) {
          this.invalidInput = true;
          inputElement.value = validValue;
          this.searchForm.get('searchInput')?.setValue(validValue);
        } else {
          this.invalidInput = false;
          this.searchTermChange.emit(validValue);
        }
      }
    } catch (error) {
      // Handle error
      console.error('An error occurred while processing input:', error);
    }
  }

  /* Reset input value and ensure invalid input is cleared, method called from parent component (Dashboard)  */
  resetSearch() {
    this.searchForm.get('searchInput')?.setValue('');
    this.searchTermChange.emit('');
    this.invalidInput = false;
  }
}
