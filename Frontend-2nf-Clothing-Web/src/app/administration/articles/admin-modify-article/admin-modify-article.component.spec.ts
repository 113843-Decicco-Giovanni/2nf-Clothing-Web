import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyArticleComponent } from './admin-modify-article.component';

describe('AdminModifyArticleComponent', () => {
  let component: AdminModifyArticleComponent;
  let fixture: ComponentFixture<AdminModifyArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModifyArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminModifyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
