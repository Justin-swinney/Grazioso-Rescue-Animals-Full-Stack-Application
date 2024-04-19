/**
 * Edit modal allows users to quickly edit all data related to the object id they are currently on.
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {
  Component, ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {AnimalFieldsFormComponent} from "../../../../shared/components/animal-fields-form/animal-fields-form.component";
import {RescueAnimalService} from "../../../../shared/services/rescue-animal-service";
import {NgIf} from "@angular/common";
import {RescueAnimal} from "../../../../shared/models/rescue-animal";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-edit-animal-info-modal',
  standalone: true,
  imports: [
    AnimalFieldsFormComponent,
    NgIf
  ],
  templateUrl: './edit-animal-info-modal.component.html',
  styleUrl: './edit-animal-info-modal.component.scss'
})
export class EditAnimalInfoModalComponent {
  @Input() animal: any = {};
  @ViewChild(AnimalFieldsFormComponent) animalFieldsFormComponent!: AnimalFieldsFormComponent;
  @Output() onSave = new EventEmitter<RescueAnimal>();
  @Output() onClose = new EventEmitter<RescueAnimal>();
  @ViewChild('editAnimalInfoModal') modalElement?: ElementRef;

  constructor(private rescueAnimalService: RescueAnimalService, private router: Router, private toastService: ToastService) {}

  // Call animal field form component to initiate saving.
  saveChanges() {
   this.animalFieldsFormComponent.onSubmit();
  }

  // Handle deleting animal object
  deleteAnimal() {
    this.rescueAnimalService.deleteAnimal(this.animal).subscribe({
      next: () => {
        console.log('Animal deleted successfully');
        this.router.navigate(['dashboard']).then(() => {
          console.log('Successful navigation to dashboard page');
        }).catch(error => {
          console.error('Navigation to dashboard page failed ERROR: ', error);
        });
      },
      error: (error) => {
        console.error('Error deleting animal: ', error);
        this.toastService.show('Error deleting animal!', {
          delay: 3000,
          class: 'bg-danger text-white'
        });
      }
    })
  }

  // Emit signal from animal forms will trigger this saving method
  saveFormData(formData: FormData) {
    this.rescueAnimalService.updateRescueAnimal(this.animal.id, formData).subscribe({
      next: (updatedAnimal) => {
        console.log('Emitting updated animal:', updatedAnimal);
        this.onSave.emit(updatedAnimal);
        console.log("SaveFormData Hit");
        this.toastService.show('Animal Updated Successfully!', {
          delay: 3000
        });
      },
      error: (error) => {
        console.error('Error updating animal:', error);
        this.toastService.show('Animal Update Failed!', {
          delay: 3000,
          class: 'bg-danger text-white'
        });
      }
    });
  }
}
