import { TestBed, inject } from '@angular/core/testing';

import { PriceDetailsMessageService } from './price-details-message.service';

describe('PriceDetailsMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceDetailsMessageService]
    });
  });

  it('should be created', inject([PriceDetailsMessageService], (service: PriceDetailsMessageService) => {
    expect(service).toBeTruthy();
  }));
});
