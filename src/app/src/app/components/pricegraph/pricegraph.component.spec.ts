import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricegraphComponent } from './pricegraph.component';

describe('PricegraphComponent', () => {
  let component: PricegraphComponent;
  let fixture: ComponentFixture<PricegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
