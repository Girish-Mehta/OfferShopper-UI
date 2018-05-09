import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { ForgotPasswordService } from './forgot-password.service';

describe('ForgotPasswordService', () => {
let mockData:any;

  let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [ForgotPasswordService,
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
    mockData = {}
  });


  it('should be created', inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    expect(service).toBeTruthy();
  }));

  it('should have forgotPasswordWithEmail function', inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    expect(service.forgotPasswordWithEmail).toBeTruthy();
  }));



  it('negative check for forgotPasswordWithEmail function and should return an offer', async(inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: mockData
          }
          )));
      });  
    service.forgotPasswordWithEmail('megha@gmail.com').subscribe(results=>{
      expect(results).not.toEqual(mockData);
    });
  })));


  // it('is a negative check for getOfferById function', async(inject([ForgotPasswordService], (service: ForgotPasswordService) => {
  //   mockBackend.connections.subscribe(
  //     (connection: MockConnection) => {
  //       connection.mockRespond(new Response(
  //         new ResponseOptions({
  //           body: negOfferResult
  //         }
  //         )));
  //     });  
  //   service. getOfferById('offer-204').subscribe(results=>{
  //     expect(results).not.toEqual(offerResult);
  //   });
  // })));


});
