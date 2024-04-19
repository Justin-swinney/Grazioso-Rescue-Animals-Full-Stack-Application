import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalFieldsFormComponent} from './animal-fields-form.component';

describe('AnimalFieldsFormComponent', () => {
  let component: AnimalFieldsFormComponent;
  let fixture: ComponentFixture<AnimalFieldsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalFieldsFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalFieldsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
