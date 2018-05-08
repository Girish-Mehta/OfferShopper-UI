import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { SubscribeService } from './subscribe.service';

describe('SubscribeService', () => {
  let mockBackend: MockBackend;

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

});
