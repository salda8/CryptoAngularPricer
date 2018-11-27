import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GoogletrendsComponent } from "./googletrends.component";

describe("GoogletrendsComponent", () => {
  let component: GoogletrendsComponent;
  let fixture: ComponentFixture<GoogletrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoogletrendsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogletrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
