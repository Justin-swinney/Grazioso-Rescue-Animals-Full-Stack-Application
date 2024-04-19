import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalTrainingStatusComponent} from './animal-training-status.component';

describe('AnimalTrainingStatusComponent', () => {
  let component: AnimalTrainingStatusComponent;
  let fixture: ComponentFixture<AnimalTrainingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalTrainingStatusComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalTrainingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
