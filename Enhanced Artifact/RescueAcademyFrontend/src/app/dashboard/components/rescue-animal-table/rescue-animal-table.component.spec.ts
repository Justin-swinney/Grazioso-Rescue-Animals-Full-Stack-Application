/**
 *
 *
 *
 * @author Justin Swinney
 * @Date 3/25/2024
 * @version 1.0
 *
 * */

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RescueAnimalTableComponent} from './rescue-animal-table.component';

describe('RescueAnimalTableComponent', () => {
  let component: RescueAnimalTableComponent;
  let fixture: ComponentFixture<RescueAnimalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RescueAnimalTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RescueAnimalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
