import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CoinPricesOnExchangesTableComponent } from "./coin-prices-on-exchanges-table.component";

describe("CoinPricesOnExchangesTableComponent", () => {
  let component: CoinPricesOnExchangesTableComponent;
  let fixture: ComponentFixture<CoinPricesOnExchangesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoinPricesOnExchangesTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinPricesOnExchangesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
