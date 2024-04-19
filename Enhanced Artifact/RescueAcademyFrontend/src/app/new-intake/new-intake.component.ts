/**
 * New intake view with saving functionality for new animal
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AnimalFieldsFormComponent} from "../shared/components/animal-fields-form/animal-fields-form.component";
import {RescueAnimal} from "../shared/models/rescue-animal";
import {RescueAnimalService} from "../shared/services/rescue-animal-service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "../shared/services/toast.service";

@Component({
  selector: 'app-new-intake',
  standalone: true,
  imports: [AnimalFieldsFormComponent],
  templateUrl: './new-intake.component.html',
  styleUrl: './new-intake.component.scss'
})
export class NewIntakeComponent {

  @Output() onSave = new EventEmitter<RescueAnimal>();

  @ViewChild(AnimalFieldsFormComponent) animalFieldsFormComponent!: AnimalFieldsFormComponent;
  constructor(private rescueAnimalService: RescueAnimalService, private router: Router, private toastService: ToastService) { }

  saveChanges() {
    this.animalFieldsFormComponent.onSubmit() // Call animalFieldComponent when save is pressed from new intake view
  }

  saveFormData(formData: FormData) { // Animal field component emits signal and activates this method to create new animal
    this.rescueAnimalService.createNewAnimal(formData).subscribe({ // Call service class
      next: () => {
        console.log('Animal created successfully');
        this.toastService.show('Animal created successfully!', { // Call toast service to display message
          delay: 3000,
          class: 'bg-success'
        });
        this.router.navigate(['dashboard']).then(() => {
          console.log('Successful navigation to dashboard page');
        }).catch(error => {
          console.error('Navigation to dashboard page failed ERROR: ', error);
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating animal:  ', error);
        this.toastService.show('Error creating animal!', { // Call toast service to display message
          delay: 3000,
          class: 'bg-danger'
        });
        if (error.status === 400 && error.error instanceof Object) {
          this.animalFieldsFormComponent.handleErrorMessages(error.error);
        }
      }
    });
  }
}
