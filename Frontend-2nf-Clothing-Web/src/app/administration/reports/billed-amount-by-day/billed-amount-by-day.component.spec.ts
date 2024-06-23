import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilledAmountByDayComponent } from './billed-amount-by-day.component';

describe('BilledAmountByDayComponent', () => {
  let component: BilledAmountByDayComponent;
  let fixture: ComponentFixture<BilledAmountByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilledAmountByDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilledAmountByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
