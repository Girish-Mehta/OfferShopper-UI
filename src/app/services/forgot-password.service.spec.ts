import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { ForgotPasswordService } from './forgot-password.service';

fdescribe('ForgotPasswordService', () => {
 let mockBackend: MockBackend;
 let mockData: any;
let neg_mockData:any;

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
    mockData= 'res'
    neg_mockData={"res":"negativeResponse"};

  });


  it('should be created', inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    expect(service).toBeTruthy();
  }));

  it('should have forgotPasswordWithEmail function', inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    expect(service.forgotPasswordWithEmail).toBeTruthy();
  }));

    it('check for forgotPasswordWithEmail function', async(inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: mockData
          }
          )));
      });  
    service.forgotPasswordWithEmail('username').subscribe(results=>{
      expect(results).toEqual(mockData);
    });
  })));


        it('neg check for forgotPasswordWithEmail function', async(inject([ForgotPasswordService], (service: ForgotPasswordService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: neg_mockData
          }
          )));
      });  
    service.forgotPasswordWithEmail('username').subscribe(results=>{
      expect(results).not.toEqual(mockData);
    });
  })));
});
