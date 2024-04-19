/**
 * Toast service initializes Boostrap 5.3 Toast service, this class is responsible for setting up the foundation
 * of the toast notification style and positioning.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import { Injectable } from '@angular/core';
declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  /* Displaying Toast message method */
  show(message: string, options: any = {}): void {

    // Create div element for toast notification global position and style
    const toastElement = document.createElement('div');

    toastElement.classList.add('toast', 'align-items-center', 'text-white', 'border-0');
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    // Allow bootstrap bg (background) to be customizable throughout the application.
    const bgClasses = options.class ? options.class.split(' ') : ['bg-success']; // Split classes into an array
    toastElement.classList.add(...bgClasses); // Use spread syntax to add multiple classes

    // Create div element for toast body
    const toastBody = document.createElement('div');
    toastBody.classList.add('d-flex');
    toastBody.innerHTML = `
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `;

    toastElement.appendChild(toastBody); // append toast body to toast element

    // Get toast container from DOM
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
      toastContainer.appendChild(toastElement);
    }

    // Set a global delay on auto hide.
    const toast = new bootstrap.Toast(toastElement, {
      delay: options.delay || 5000, // Default delay to 5000ms
    });

    toast.show();
  }
}
