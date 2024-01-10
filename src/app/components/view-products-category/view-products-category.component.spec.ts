import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsCategoryComponent } from './view-products-category.component';

describe('ViewProductsCategoryComponent', () => {
  let component: ViewProductsCategoryComponent;
  let fixture: ComponentFixture<ViewProductsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
