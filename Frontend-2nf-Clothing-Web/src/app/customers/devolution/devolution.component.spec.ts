import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionComponent } from './devolution.component';

describe('DevolutionComponent', () => {
  let component: DevolutionComponent;
  let fixture: ComponentFixture<DevolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
