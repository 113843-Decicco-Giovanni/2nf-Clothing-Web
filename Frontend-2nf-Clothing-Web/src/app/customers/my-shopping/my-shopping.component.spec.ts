import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShoppingComponent } from './my-shopping.component';

describe('MyShoppingComponent', () => {
  let component: MyShoppingComponent;
  let fixture: ComponentFixture<MyShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyShoppingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
