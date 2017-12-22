import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoPricerComponent } from './crypto-pricer.component';

describe('CryptoPricerComponent', () => {
  let component: CryptoPricerComponent;
  let fixture: ComponentFixture<CryptoPricerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoPricerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoPricerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
