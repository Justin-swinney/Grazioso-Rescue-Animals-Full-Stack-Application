import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditAnimalInfoModalComponent} from './edit-animal-info-modal.component';

describe('EditAnimalInfoModalComponent', () => {
  let component: EditAnimalInfoModalComponent;
  let fixture: ComponentFixture<EditAnimalInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAnimalInfoModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditAnimalInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
