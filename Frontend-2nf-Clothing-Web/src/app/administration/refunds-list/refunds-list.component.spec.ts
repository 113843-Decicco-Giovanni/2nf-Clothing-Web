import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsListComponent } from './refunds-list.component';

describe('RefundsListComponent', () => {
  let component: RefundsListComponent;
  let fixture: ComponentFixture<RefundsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
