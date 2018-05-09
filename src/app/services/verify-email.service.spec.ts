import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { VerifyEmailService } from './verify-email.service';

import {RESPONSE1,RESPONSE2,TOKEN } from './verify-email.service-mockdata';

describe('VerifyEmailService', () => {
let mockBackend: MockBackend;
let response1:any;
let response2:any;
let token=TOKEN;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [VerifyEmailService,
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
    response1=RESPONSE1;
    response2=RESPONSE2;
    token=TOKEN;
  });


  it('should be created', inject([VerifyEmailService], (service: VerifyEmailService) => {
    expect(service).toBeTruthy();
  }));

  it('should have verifyEmailWithEmail function', inject([VerifyEmailService], (service: VerifyEmailService) => {
    expect(service.verifyEmailWithEmail).toBeTruthy();
  }));

  it(' check for verifyEmailWithEmail function', async(inject([VerifyEmailService], (service: VerifyEmailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body:response1
          }
          )));
      });  
    service.verifyEmailWithEmail(token).subscribe(results=>{
      //expect(results).toEqual(addToCarrybagObj);
      expect(response1).toEqual(response1);      
    });
  })));

  // it('negative check for addToCarrybag function ', async(inject([VerifyEmailService], (service: VerifyEmailService) => {
  //   mockBackend.connections.subscribe(
  //     (connection: MockConnection) => {
  //         connection.mockRespond(new Response(
  //         new ResponseOptions({
  //           status:200
  //         }
  //         )));
  //     });  
  //   service.verifyEmailWithEmail(tocken).subscribe(results=>{
  //    // expect(results).not.toEqual(addToCarrybagObj);
  //     expect(results).not.toEqual(400);      
  //   });
  // })));

});
