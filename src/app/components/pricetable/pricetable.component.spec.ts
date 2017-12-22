import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetableComponent } from './pricetable.component';

describe('PricetableComponent', () => {
  let component: PricetableComponent;
  let fixture: ComponentFixture<PricetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
