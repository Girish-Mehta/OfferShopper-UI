import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { SearchService } from './search.service';

describe('SearchService', () => {
let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SearchService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory:
        (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }],
      imports : [HttpClientModule,HttpModule],
    });
    mockBackend = getTestBed().get(MockBackend);

  });


  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should have searchEntries function', inject([SearchService], (service: SearchService) => {
    expect(service.searchEntries).toBeTruthy();
  }));
    it('should have searchProducts function', inject([SearchService], (service: SearchService) => {
    expect(service.searchProducts).toBeTruthy();
  }));
    it('should have searchProductsCategoryOnly function', inject([SearchService], (service: SearchService) => {
    expect(service.searchProductsCategoryOnly).toBeTruthy();
  }));
  it('should have searchProductsCategoryAndKey function', inject([SearchService], (service: SearchService) => {
    expect(service.searchProductsCategoryAndKey).toBeTruthy();
  }));

});
