import { TestBed, inject } from "@angular/core/testing";

import { CryptostreamersocketsService } from "./cryptostreamersockets.service";

describe("CryptostreamersocketsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptostreamersocketsService]
    });
  });

  it("should be created", inject(
    [CryptostreamersocketsService],
    (service: CryptostreamersocketsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
