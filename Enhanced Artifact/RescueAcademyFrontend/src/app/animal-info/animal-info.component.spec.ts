import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInfoComponent } from './animal-info.component';

describe('AnimalInfoComponent', () => {
  let component: AnimalInfoComponent;
  let fixture: ComponentFixture<AnimalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
