import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalPhysicalCharacteristicsInfoComponent} from './animal-physical-characteristics-info.component';

describe('AnimalPhysicalCharacteristicsInfoComponent', () => {
  let component: AnimalPhysicalCharacteristicsInfoComponent;
  let fixture: ComponentFixture<AnimalPhysicalCharacteristicsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalPhysicalCharacteristicsInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalPhysicalCharacteristicsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
