import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { LocationService } from './location.service';

fdescribe('LocationService', () => {
let mockBackend: MockBackend;
let mockData: any;
let neg_mockData:any;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [LocationService,
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
    mockData= {"res":"response"};
    neg_mockData={"res":"negativeResponse"};

  });


  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getLocation function', inject([LocationService], (service: LocationService) => {
    expect(service.getLocation).toBeTruthy();
  }));

  it('should have updateLocation function', inject([LocationService], (service: LocationService) => {
    expect(service.updateLocation).toBeTruthy();
  }));

   it('check for getLocation function', async(inject([LocationService], (service: LocationService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: mockData
          }
          )));
      });  
    service.getLocation('latitude', 'longitude').subscribe(results=>{
      expect(results).toEqual(mockData);
    });
  })));

      it('neg check for getLocation function', async(inject([LocationService], (service: LocationService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: neg_mockData
          }
          )));
      });  
    service.getLocation('latitude', 'longitude').subscribe(results=>{
      expect(results).not.toEqual(mockData);
    });
  })));

});
