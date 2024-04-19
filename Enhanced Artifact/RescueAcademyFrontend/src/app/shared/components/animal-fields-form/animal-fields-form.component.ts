/**
 * Animal form for the creation and changes of animal information
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {InputValidation} from "../../services/input-validation";
import {RescueAnimal} from "../../models/rescue-animal";
import {RescueAnimalService} from "../../services/rescue-animal-service";

declare var bootstrap: any;

@Component({
  selector: 'app-animal-fields-form',
  standalone: true,
  providers: [DatePipe],
  imports: [
    NgIf,
    ReactiveFormsModule,
    InputValidation,
    TitleCasePipe,
  ],
  templateUrl: './animal-fields-form.component.html',
  styleUrl: './animal-fields-form.component.scss'
})
export class AnimalFieldsFormComponent implements OnInit, OnChanges {
  selectedAnimalType?: string;
  animalFieldsForm!: FormGroup;
  selectedFile?: File;
  isValidInput: { [key: string]: boolean } = {};
  submittedForm = false;

  @Input() isNewAnimal?: boolean;
  @Input() animal?: RescueAnimal;

  @Output() closeForm?: boolean = false;
  @Output() animalTypeChange = new EventEmitter<string>();
  @Output() saveFormData = new EventEmitter<FormData>();


  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private renderer: Renderer2, private rescueAnimalService: RescueAnimalService) { }

  // Reset form and fetch data if changes occur
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animal'] && !changes['animal'].isFirstChange()) {
      this.animalFieldsForm.reset();
      this.fetchAnimalData();
    }
  }

  ngOnInit(): void {
    // Build form template with validation rules
    this.animalFieldsForm = this.formBuilder.group({
      animalType: ['', Validators.required],
      rescueType: ['', Validators.required],
      trainingStatus: ['', Validators.required],
      reserved: ['', Validators.required],
      inServiceLocation: ['', Validators.required],
      name: ['', Validators.required],
      breed: ['', Validators.required],
      species: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      bodyLength: ['', Validators.required],
      height: ['', Validators.required],
      tailLength: ['', Validators.required],
      originCountry: ['', Validators.required],
      originDate: ['', Validators.required],
    });

    // Initialize isValid object with validation status for each fieldName
    Object.keys(this.animalFieldsForm.controls).forEach((fieldName) => {
      this.isValidInput[fieldName] = this.animalFieldsForm.get(fieldName)?.valid ?? false;
    });

    // Conditional if animal exist populate form with data
    if (this.animal) {
      this.selectedAnimalType = this.animal.animalType;
      this.animalFieldsForm.patchValue(this.animal);
    }
    this.fetchAnimalData(); // Fetch animal data on initialization
  }

  // Fetch animal information to ensure edit modal is up-to-date.
  private fetchAnimalData(): void {
    if (this.animal) {
      this.rescueAnimalService.getAnimalById(this.animal.id!).subscribe(animal => {
        this.animalFieldsForm.patchValue(animal);
      });
    }
  }

  // Handle file selection for input of image
  onImageSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Handle animal type selection for new intake, displays type specific traits
  onAnimalTypeChange(type: string) {
    this.selectedAnimalType = type;
    this.animalTypeChange.emit(type);
  }

  // Handle submission of form (from edit modal or new intake)
  onSubmit() {
    this.submittedForm = true;
    const formData = new FormData();
    // If image is applied, append image to form for multipart request
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // Format origin date and patch to form
    const formattedOriginDate = this.datePipe.transform(this.animalFieldsForm.get('originDate')?.value, 'MM/dd/yyyy');
    if (formattedOriginDate) {
      this.animalFieldsForm.patchValue({originDate: formattedOriginDate});
    }


    // Handle animal type specific attributes to avoid have specific traits on all animals
    if (this.isNewAnimal == false) {
      const commonFields = this.animalFieldsForm.value;
      delete commonFields.breed;
      delete commonFields.species;
      delete commonFields.animalType;
      delete commonFields.bodyLength;
      delete commonFields.height;
      delete commonFields.tailLength;

      // Add specific traits back to animals based on type
      if (this.selectedAnimalType === 'dog') {
        commonFields.breed = this.animalFieldsForm.get('breed')?.value;
      } else if (this.selectedAnimalType === 'monkey') {
        commonFields.species = this.animalFieldsForm.get('species')?.value;
        commonFields.bodyLength = this.animalFieldsForm.get('bodyLength')?.value;
        commonFields.height = this.animalFieldsForm.get('height')?.value;
        commonFields.tailLength = this.animalFieldsForm.get('tailLength')?.value;
      }
      formData.append('animal', JSON.stringify(commonFields));

    }
    formData.append('animal', JSON.stringify(this.animalFieldsForm.value));
    this.saveFormData.emit(formData);
  }

  // Handle input validation
  handleValidationStatus(event: { fieldName: string, isValid: boolean }) {
    console.log('Validation status:', event);
    this.isValidInput[event.fieldName.trim()] = event.isValid;
  }

  // Handle backend error messages and display to user
  handleErrorMessages(errors: any) {
    Object.keys(errors).forEach(field => {
      const control = this.animalFieldsForm.get(field);
      if (control) {
        control.setErrors({backend: errors[field]});
      }
    });
  }
}
