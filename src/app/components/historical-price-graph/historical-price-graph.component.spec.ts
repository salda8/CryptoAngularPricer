import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HistoricalPriceGraphComponent } from "./historical-price-graph.component";

describe("HistoricalPriceGraphComponent", () => {
  let component: HistoricalPriceGraphComponent;
  let fixture: ComponentFixture<HistoricalPriceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalPriceGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalPriceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
