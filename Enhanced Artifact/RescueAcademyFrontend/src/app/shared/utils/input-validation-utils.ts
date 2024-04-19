/**
 * Various methods for handling input validation, this class directly communicates with the input-validation service.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InputValidationUtils {

  constructor() { }

  validateStringAlphaNumericOnly(inputValue: string): string {
    return inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
  }

  validateStringAlphaOnly(inputValue: string): string {
    return inputValue.replace(/[^a-zA-Z ]/g, "");
  }

  validateStringNumericOnly(inputValue: string): string {
  return inputValue.replace(/[^0-9]/g, '');
  }

  validateStringAlphaAndApostropheOnly(inputValue: string): string {
    return inputValue.replace(/[^a-zA-Z\s']/g, '');
  }

  // Validate format MM/DD/YYYY
  validateStringDateOnly(inputValue: string): string {
   return inputValue.replace(/[^(0[1-9]|1[0-2]\/(0[1-9]|[12]\d|3[01])\/\d{4}]$/g, '');
  }

  validateEmail(inputValue: string): string {
    return inputValue.replace(/[<>"'&;]/g, '');
  }
}
