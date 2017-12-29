import { TestBed, inject } from '@angular/core/testing';

import { CryptoPricesService } from './crypto-prices.service';

describe('CryptoPricesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoPricesService]
    });
  });

  it('should be created', inject([CryptoPricesService], (service: CryptoPricesService) => {
    expect(service).toBeTruthy();
  }));
});
