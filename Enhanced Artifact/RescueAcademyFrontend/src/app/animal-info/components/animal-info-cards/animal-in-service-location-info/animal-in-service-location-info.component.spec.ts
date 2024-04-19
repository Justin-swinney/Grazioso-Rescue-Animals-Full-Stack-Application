import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInServiceLocationInfoComponent } from './animal-in-service-location-info.component';

describe('AnimalInServiceLocationInfoComponent', () => {
  let component: AnimalInServiceLocationInfoComponent;
  let fixture: ComponentFixture<AnimalInServiceLocationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalInServiceLocationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalInServiceLocationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
