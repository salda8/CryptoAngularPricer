import { TestBed, inject } from '@angular/core/testing';

import { PriceUpdateService } from './price-update.service';

describe('PriceUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceUpdateService]
    });
  });

  it('should be created', inject([PriceUpdateService], (service: PriceUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
