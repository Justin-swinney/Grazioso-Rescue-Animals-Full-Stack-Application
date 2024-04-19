/**
 * Reserve modal allows users to quickly check animals in and out, in doing so the location, reservation status and map display will be changed
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {InputValidation} from "../../../../shared/services/input-validation";
import {RescueAnimalService} from "../../../../shared/services/rescue-animal-service";
import {RescueAnimal} from "../../../../shared/models/rescue-animal";
import {
  AnimalInServiceLocationInfoComponent
} from "../../animal-info-cards/animal-in-service-location-info/animal-in-service-location-info.component";
import {AnimalInfoComponent} from "../../../animal-info.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-reserve-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    InputValidation,
    NgClass
  ],
  templateUrl: './reserve-modal.component.html',
  styleUrl: './reserve-modal.component.scss'
})
export class ReserveModalComponent implements AfterViewInit {
  isValidInput: boolean = true;
  @Input() animalId!: string;
  @Input() animal!: RescueAnimal;
  @Output() reservationStatusChanged = new EventEmitter<boolean>();
  @ViewChild('reserveModal') modalElement?: ElementRef;
  @ViewChild(AnimalInfoComponent) updateView?: AnimalInfoComponent;
  reserveForm = new FormGroup({
    inServiceLocation: new FormControl('', Validators.required)
  });

  ngAfterViewInit() {
    console.log('Current in-service location:', this.animal.inServiceLocation);
    this.modalElement!.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.reserveForm.get('inServiceLocation')?.reset(); // Reset the 'inServiceLocation' form control
      this.reserveForm.get('reserved')?.reset();
    });
  }

  constructor(private rescueAnimalService: RescueAnimalService, private toastService: ToastService) {}

  // Handle reservation status change
  updateReservationStatus() {
    const {id} = this.animal;
    if (!id) {
      console.error('Animal ID is undefined.');
      return;
    }
    const updatedAnimal: RescueAnimal = {
      id: this.animalId,
      reserved: !this.animal.reserved,
      inServiceLocation: this.reserveForm.value.inServiceLocation || ''
    };
    const formData = new FormData();
    formData.append('animal', JSON.stringify(updatedAnimal)); // Append animal object (partial update) to form data
    this.rescueAnimalService.updateRescueAnimal(id, formData).subscribe({ // Call service to perform a patch update
      next: () => {
        this.reservationStatusChanged.emit(); // Emit reservation status change
        this.updateView?.loadAnimalDetails(this.animalId);
        this.toastService.show('Animal reservation update successfully!', {
          delay: 3000,
          class: 'bg-success text-white'
        });
      },
        error: (error) => {
        console.log('Emitting updated reservation status!');
        this.toastService.show('Animal reservation update failed!', {
          delay: 3000,
          class: 'bg-danger text-white'
        });
      }
    });
  }
}

