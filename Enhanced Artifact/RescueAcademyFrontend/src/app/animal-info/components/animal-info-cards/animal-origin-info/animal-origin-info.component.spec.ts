import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalOriginInfoComponent} from './animal-origin-info.component';

describe('AnimalOriginInfoComponent', () => {
  let component: AnimalOriginInfoComponent;
  let fixture: ComponentFixture<AnimalOriginInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalOriginInfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalOriginInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
