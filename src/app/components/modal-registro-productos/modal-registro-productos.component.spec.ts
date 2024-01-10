import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroProductosComponent } from './modal-registro-productos.component';

describe('ModalRegistroProductosComponent', () => {
  let component: ModalRegistroProductosComponent;
  let fixture: ComponentFixture<ModalRegistroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
