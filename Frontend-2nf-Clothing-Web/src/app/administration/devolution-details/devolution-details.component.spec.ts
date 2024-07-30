import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionDetailsComponent } from './devolution-details.component';

describe('DevolutionDetailsComponent', () => {
  let component: DevolutionDetailsComponent;
  let fixture: ComponentFixture<DevolutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolutionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
