import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewArticleComponent } from './admin-new-article.component';

describe('AdminNewArticleComponent', () => {
  let component: AdminNewArticleComponent;
  let fixture: ComponentFixture<AdminNewArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
