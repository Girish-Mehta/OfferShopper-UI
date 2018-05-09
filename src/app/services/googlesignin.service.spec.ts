import { TestBed, inject } from '@angular/core/testing';

import { GooglesigninService } from './googlesignin.service';

describe('GooglesigninService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglesigninService]
    });
  });

  it('should be created', inject([GooglesigninService], (service: GooglesigninService) => {
    expect(service).toBeTruthy();
  }));
});
