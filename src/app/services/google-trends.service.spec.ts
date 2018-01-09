import { TestBed, inject } from '@angular/core/testing';

import { GoogleTrendsService } from './google-trends.service';

describe('GoogleTrendsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleTrendsService]
    });
  });

  it('should be created', inject([GoogleTrendsService], (service: GoogleTrendsService) => {
    expect(service).toBeTruthy();
  }));
});
