import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilledAmountByMonthComponent } from './billed-amount-by-month.component';

describe('BilledAmountByMonthComponent', () => {
  let component: BilledAmountByMonthComponent;
  let fixture: ComponentFixture<BilledAmountByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilledAmountByMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilledAmountByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
