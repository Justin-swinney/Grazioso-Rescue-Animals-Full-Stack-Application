/**
 * Global Error handler to catch any un caught errors.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {ErrorHandler, Injectable} from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('Error occurred: ', error);
  }
}
