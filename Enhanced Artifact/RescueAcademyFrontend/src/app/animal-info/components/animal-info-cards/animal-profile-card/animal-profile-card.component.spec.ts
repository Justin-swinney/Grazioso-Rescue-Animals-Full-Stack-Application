import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalProfileCardComponent} from './animal-profile-card.component';

describe('AnimalProfileCardComponent', () => {
  let component: AnimalProfileCardComponent;
  let fixture: ComponentFixture<AnimalProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalProfileCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
