import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditProductComponent } from './modal-edit-product.component';

describe('ModalEditProductComponent', () => {
  let component: ModalEditProductComponent;
  let fixture: ComponentFixture<ModalEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
