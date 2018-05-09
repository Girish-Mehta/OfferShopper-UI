import { TestBed, inject } from '@angular/core/testing';

import { OsCashService } from './os-cash.service';

describe('OsCashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OsCashService]
    });
  });

  it('should be created', inject([OsCashService], (service: OsCashService) => {
    expect(service).toBeTruthy();
  }));
});
