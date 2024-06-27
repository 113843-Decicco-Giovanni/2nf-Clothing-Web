import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShoppingDetailComponent } from './my-shopping-detail.component';

describe('MyShoppingDetailComponent', () => {
  let component: MyShoppingDetailComponent;
  let fixture: ComponentFixture<MyShoppingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyShoppingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyShoppingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
