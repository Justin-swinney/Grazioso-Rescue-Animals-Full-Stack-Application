/**
 * Profile card is the main focal point of animal info page
 * Contains profile pictures, breed / species, animal name, reservation status and button, dynamic animal icon
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ReserveModalComponent} from "../../modals/reserve-modal/reserve-modal.component";
import {RescueAnimal} from "../../../../shared/models/rescue-animal";
import {RescueAnimalService} from "../../../../shared/services/rescue-animal-service";
import {AnimalInfoComponent} from "../../../animal-info.component";

@Component({
  selector: 'app-animal-profile-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    ReserveModalComponent
  ],
  templateUrl: './animal-profile-card.component.html',
  styleUrl: './animal-profile-card.component.scss'
})
export class AnimalProfileCardComponent implements OnInit {
  animalId?: string;
  @Input() animal!: RescueAnimal | undefined;
  @ViewChild(AnimalInfoComponent) updateView?: AnimalInfoComponent;
  @Output() onSave = new EventEmitter<any>();
  constructor(private rescueAnimalService: RescueAnimalService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAnimalDetails();
  }

  // Emit reservation change and save
  updateReservationStatus(reserved: boolean) {
    console.log(this.animal?.id);
    if (this.animal) {
      this.onSave.emit(this.animal);
      this.animal.reserved = reserved;
      this.changeDetectorRef.detectChanges()

    }
  }

  // Load animal details to ensure up to date.
  loadAnimalDetails() {
    this.animal!.animalProfilePictureUrl += '?v=' + Date.now();
    if (this.animalId) {
      this.rescueAnimalService.getAnimalById(this.animalId).subscribe(animal => {
        this.animal = animal;
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
