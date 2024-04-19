/**
 * Parent component to animal view page, contains shared logic between modals, card components
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {
  ChangeDetectorRef,
  Component, Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {RescueAnimal} from "../shared/models/rescue-animal";
import {ActivatedRoute, Router} from "@angular/router";
import {RescueAnimalService} from "../shared/services/rescue-animal-service";
import {
  AnimalProfileCardComponent
} from "./components/animal-info-cards/animal-profile-card/animal-profile-card.component";
import {
  AnimalTrainingInfoComponent
} from "./components/animal-info-cards/animal-training-info/animal-training-info.component";
import {
  AnimalInServiceLocationInfoComponent
} from "./components/animal-info-cards/animal-in-service-location-info/animal-in-service-location-info.component";
import {
  AnimalPhysicalCharacteristicsInfoComponent
} from "./components/animal-info-cards/animal-physical-characteristics-info/animal-physical-characteristics-info.component";
import {
  AnimalOriginInfoComponent
} from "./components/animal-info-cards/animal-origin-info/animal-origin-info.component";
import {
  EditAnimalInfoModalComponent
} from "./components/modals/edit-animal-info-modal/edit-animal-info-modal.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-animal-info',
  standalone: true,
  imports: [
    AnimalProfileCardComponent,
    AnimalTrainingInfoComponent,
    AnimalInServiceLocationInfoComponent,
    AnimalPhysicalCharacteristicsInfoComponent,
    AnimalOriginInfoComponent,
    EditAnimalInfoModalComponent,
    NgIf
  ],
  templateUrl: './animal-info.component.html',
  styleUrl: './animal-info.component.scss'
})
export class AnimalInfoComponent implements OnInit {

  @Input() animal?: RescueAnimal;

  @ViewChild(EditAnimalInfoModalComponent) editModal?: EditAnimalInfoModalComponent;
  @ViewChild(AnimalInServiceLocationInfoComponent) updateServiceLocation?: AnimalInServiceLocationInfoComponent;
  constructor(private router: Router, private route: ActivatedRoute, private rescueAnimalService: RescueAnimalService, private changeDetectorRef: ChangeDetectorRef,) { }


  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id'); // Get id from route snapshot
    if (animalId) { // If animal id exist
      this.loadAnimalDetails(animalId); // Load animal details
    }
  }

  // Load animal details
  loadAnimalDetails(animalId: string) {
    this.rescueAnimalService.getAnimalById(animalId).subscribe({ // Call service
      next: (updatedAnimal) => {
        this.animal = updatedAnimal;
        this.updateServiceLocation?.updateMap(this.animal.inServiceLocation!); // Update map
        this.changeDetectorRef.detectChanges(); // Trigger change detector to update view
      },
      error: (error) => {
        console.error("Failed to load animal details", error);
      }
    });
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard']).then(() => {
      console.log('Successful navigation to dashboard page');
    }).catch(error => {
      console.error('Navigation to dashboard page failed ERROR: ', error);
    });
  }
}
