import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionsListComponent } from './devolutions-list.component';

describe('DevolutionsListComponent', () => {
  let component: DevolutionsListComponent;
  let fixture: ComponentFixture<DevolutionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolutionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolutionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
