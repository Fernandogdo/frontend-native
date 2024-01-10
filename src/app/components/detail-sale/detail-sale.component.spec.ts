import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSaleComponent } from './detail-sale.component';

describe('DetailSaleComponent', () => {
  let component: DetailSaleComponent;
  let fixture: ComponentFixture<DetailSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
