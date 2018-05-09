import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { SearchService } from './search.service';
import { SEARCH_BY_TERM } from './search-service-mockdata';
import { SEARCH_BY_WORD } from './search-service-mockdata';
import { SEARCH_BY_CATEGORY } from './search-service-mockdata';
import { SEARCH_BY_CATEGORY_KEY } from './search-service-mockdata';


fdescribe('SearchService', () => {
let mockBackend: MockBackend;
let searchResult=[],any;
let offerResult:any;
let categoryResult:any;
let categorWiseResult;

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
    searchResult=SEARCH_BY_TERM;
    offerResult=SEARCH_BY_WORD;
    categoryResult=SEARCH_BY_CATEGORY;
    categorWiseResult=SEARCH_BY_CATEGORY_KEY;

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

  it('check for search entries to return the suggested word', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[searchResult,200
              ]
          }
          )));
      });  
    service.searchEntries('ni').subscribe(results=>{
      expect(results[0]).toEqual(searchResult);
      expect(results[1]).toEqual(200);

    });
  })));

  it('negative test check for search entries', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[null,200
              ]
          }
          )));
      });  
    service.searchEntries('ni').subscribe(results=>{
      expect(results[0]).not.toEqual(searchResult);
      expect(results[1]).not.toEqual(300);

    });
  })));

  it('check for search key to return the required offer', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[offerResult,200
              ]
          }
          )));
      });  
    service.searchProducts('bat').subscribe(results=>{
      expect(results[0]).toEqual(offerResult);
      expect(results[1]).toEqual(200);

    });
  })));

  it('negative test to check for search key to return the required offer', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[null,404
              ]
          }
          )));
      });  
    service.searchProducts('bat').subscribe(results=>{
      expect(results[0]).not.toEqual(offerResult);
      expect(results[1]).not.toEqual(200);

    });
  })));
  
  it('check by category to return the offer from specific category', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[categoryResult,200
              ]
          }
          )));
      });  
    service.searchProductsCategoryOnly('food').subscribe(results=>{
      expect(results[0]).toEqual(categoryResult);
      expect(results[1]).toEqual(200);

    });
  })));

  it('negative test case to check by category to return the offer from specific category', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[null,404
              ]
          }
          )));
      });  
    service.searchProductsCategoryOnly('food').subscribe(results=>{
      expect(results[0]).not.toEqual(categoryResult);
      expect(results[1]).not.toEqual(200);

    });
  })));

  it('check by category and key to return the offer from specific category', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[categorWiseResult,200
              ]
          }
          )));
      });  
    service.searchProductsCategoryAndKey('food','burger').subscribe(results=>{
      expect(results[0]).toEqual(categorWiseResult);
      expect(results[1]).toEqual(200);

    });
  })));

  it('negative test case to check by category and key to return the offer from specific category', async(inject([SearchService], (service: SearchService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body:[null,404
              ]
          }
          )));
      });  
    service.searchProductsCategoryAndKey('food','burger').subscribe(results=>{
      expect(results[0]).not.toEqual(categorWiseResult);
      expect(results[1]).not.toEqual(200);

    });
  })));

});
