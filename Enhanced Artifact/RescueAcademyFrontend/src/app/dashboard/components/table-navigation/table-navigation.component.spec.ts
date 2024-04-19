import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableNavigationComponent} from './table-navigation.component';

describe('TableNavigationComponent', () => {
  let component: TableNavigationComponent;
  let fixture: ComponentFixture<TableNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNavigationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
