import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { CarrybagService } from './carrybag.service';

describe('CarrybagService', () => {
let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [CarrybagService,
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


  it('should be created', inject([CarrybagService], (service: CarrybagService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getCarrybaglist function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.getCarrybaglist).toBeTruthy();
  }));
    it('should have deleteCarrybag function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.deleteCarrybag).toBeTruthy();
  }));
    it('should have newCouponGenerate function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.newCouponGenerate).toBeTruthy();
  }));
  it('should have checkCouponExistence function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.checkCouponExistence).toBeTruthy();
  }));
    it('should have updateFeedback function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.updateFeedback).toBeTruthy();
  }));
    it('should have addToCarrybag function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.addToCarrybag).toBeTruthy();
  }));
});
