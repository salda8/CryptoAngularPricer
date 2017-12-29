import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoStreamerComponent } from './crypto-streamer.component';

describe('CryptoStreamerComponent', () => {
  let component: CryptoStreamerComponent;
  let fixture: ComponentFixture<CryptoStreamerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoStreamerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoStreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
