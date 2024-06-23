import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentModifyComponent } from './shipment-modify.component';

describe('ShipmentModifyComponent', () => {
  let component: ShipmentModifyComponent;
  let fixture: ComponentFixture<ShipmentModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipmentModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
