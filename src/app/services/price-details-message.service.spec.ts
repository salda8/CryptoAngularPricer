import { TestBed, inject } from '@angular/core/testing';

import { ContinousPriceUpdatesMessageService } from './price-details-message.service';

describe('PriceDetailsMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContinousPriceUpdatesMessageService]
    });
  });

  it('should be created', inject([ContinousPriceUpdatesMessageService], (service: ContinousPriceUpdatesMessageService) => {
    expect(service).toBeTruthy();
  }));
});
