import { TestBed, inject } from "@angular/core/testing";

import { ConsoleLoggerService } from "./logger.service";

describe("LoggerService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsoleLoggerService]
    });
  });

  it("should be created", inject(
    [ConsoleLoggerService],
    (service: ConsoleLoggerService) => {
      expect(service).toBeTruthy();
    }
  ));
});
