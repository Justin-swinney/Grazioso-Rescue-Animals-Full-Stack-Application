/**
 * Directive for input validation
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {InputValidationUtils} from "../utils/input-validation-utils";

@Directive({
  standalone: true,
  selector: '[appInputValidation]'
})
export class InputValidation {

  @Input() fieldName: string = ''; // Specific filed to be validated
  @Input() validationType: 'alphaNumeric' | 'alphaAndApos' | 'numeric' | 'alpha' | 'date' | 'againstScript' | 'email' = 'alphaNumeric'; // Validation "types"
  @Output() validationStatus = new EventEmitter<{ fieldName: string, isValid: boolean }>(); // Validation status emitter

  constructor(private el: ElementRef, private inputValidationUtils: InputValidationUtils) { }

  @HostListener('input', ['$event']) // Listen for events on elements.
  @HostListener('blur', ['$event'])
  onInput(event: InputEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement; // Get input native element
    const originalValue = inputElement.value; // Get original value of input element
    let validValue = originalValue; // Initialize validValue with originalValue

    /* Switch case to handle validation based on validation type emitted  */
    switch (this.validationType) {
      case 'alphaNumeric': {
        validValue = this.inputValidationUtils.validateStringAlphaNumericOnly(originalValue);
        break
      }
      case 'alpha':
        validValue = this.inputValidationUtils.validateStringAlphaOnly(originalValue);
        break
      case 'numeric':
        validValue = this.inputValidationUtils.validateStringNumericOnly(originalValue);
        break
      case 'alphaAndApos':
        validValue = this.inputValidationUtils.validateStringAlphaAndApostropheOnly(originalValue);
        break
      case 'date':
        validValue = this.inputValidationUtils.validateStringDateOnly(originalValue);
        break;
      case 'againstScript':
        validValue = this.inputValidationUtils.validateEmail(originalValue);
        break;
    }
    /* Handle bad inputs and update input value and emit validation status */
    if (validValue !== originalValue) {
      event.preventDefault();
      inputElement.value = validValue;
      this.validationStatus.emit({fieldName: this.fieldName, isValid: false});
      setTimeout(() => {
        this.validationStatus.emit({fieldName: this.fieldName, isValid: true});
      }, 4000);
    }
    else {
      this.validationStatus.emit({fieldName: this.fieldName, isValid: true}); // If input does not meet the invalid conditional block return isValid.
    }
  }
}
