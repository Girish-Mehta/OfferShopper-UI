import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { SubscribeService } from './subscribe.service';

import { OFFER_BY_ID } from './subscribe-service-mockdata';
import { SUBSCRIBE_BEAN } from './subscribe-service-mockdata';

describe('SubscribeService', () => {
  let mockBackend: MockBackend;
  let getAllDetailResult: any;
  let subscribe:any;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SubscribeService,
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
    getAllDetailResult=OFFER_BY_ID;
    subscribe=SUBSCRIBE_BEAN;

  });


  it('should be created', inject([SubscribeService], (service: SubscribeService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getAllDetails function', inject([SubscribeService], (service: SubscribeService) => {
    expect(service.getAllDetails).toBeTruthy();
  }));
  it('should have deleteSubscriptionsById function', inject([SubscribeService], (service: SubscribeService) => {
    expect(service.deleteSubscriptionsById).toBeTruthy();
  }));
  it('should have addToSubscriptionList function', inject([SubscribeService], (service: SubscribeService) => {
    expect(service.addToSubscriptionList).toBeTruthy();
  }));
  it('check for offers in subscription list', async(inject([SubscribeService], (service: SubscribeService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: getAllDetailResult
          }
          )));
      });  
    service.getAllDetails('string').subscribe(results=>{
      expect(results).toEqual(getAllDetailResult);
    });
  })));

  it('Negative test to check for offers in subscription list', async(inject([SubscribeService], (service: SubscribeService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:404
          }
          )));
      });  
    service.getAllDetails('string').subscribe(results=>{
      expect(results).not.toEqual(200);
    });
  })));


  it('check for delete selected offer', async(inject([SubscribeService], (service: SubscribeService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:200
          }
          )));
      });  
    service.deleteSubscriptionsById('string','string').subscribe(results=>{
      expect(results).toEqual(200);
    });
  })));


  it('negative test case to check for deleting the selected offer', async(inject([SubscribeService], (service: SubscribeService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:500
          }
          )));
      });  
    service.deleteSubscriptionsById('string','string').subscribe(results=>{
      expect(results).not.toEqual(200);
    });
  })));


  it('check for addition of offer to subscription list', async(inject([SubscribeService], (service: SubscribeService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:200
          }
          )));
      });  
    service.addToSubscriptionList(subscribe).subscribe(results=>{
      expect(results).toEqual(200);
    });
  })));

  it('negative test case to check for addition of offer to subscription list', async(inject([SubscribeService], (service: SubscribeService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:409
          }
          )));
      });  
    service.addToSubscriptionList(subscribe).subscribe(results=>{
      expect(results).not.toEqual(200);
    });
  })));

});
