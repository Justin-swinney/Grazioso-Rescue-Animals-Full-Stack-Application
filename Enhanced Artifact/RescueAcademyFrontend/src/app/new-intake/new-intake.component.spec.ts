import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIntakeComponent } from './new-intake.component';

describe('NewIntakeComponent', () => {
  let component: NewIntakeComponent;
  let fixture: ComponentFixture<NewIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewIntakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
