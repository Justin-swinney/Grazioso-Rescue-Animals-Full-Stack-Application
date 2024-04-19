import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalTrainingInfoComponent} from './animal-training-info.component';

describe('AnimalTrainingInfoComponent', () => {
  let component: AnimalTrainingInfoComponent;
  let fixture: ComponentFixture<AnimalTrainingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalTrainingInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalTrainingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
