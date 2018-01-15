import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialStatsComponent } from './social-stats.component';

describe('SocialStatsComponent', () => {
  let component: SocialStatsComponent;
  let fixture: ComponentFixture<SocialStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
