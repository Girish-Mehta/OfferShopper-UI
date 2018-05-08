import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';

import { MessageService } from './message.service';

xdescribe('MessageService', () => {
let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [MessageService, ToastsManager,ToastModule.forRoot(),
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


  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should have showErrorToast function', inject([MessageService], (service: MessageService) => {
    expect(service.showErrorToast).toBeTruthy();
  }));
    it('should have showSuccessToast function', inject([MessageService], (service: MessageService) => {
    expect(service.showSuccessToast).toBeTruthy();
  }));
  //   it('should have newCouponGenerate function', inject([MessageService], (service: MessageService) => {
  //   expect(service.newCouponGenerate).toBeTruthy();
  // }));
  // it('should have checkCouponExistence function', inject([MessageService], (service: MessageService) => {
  //   expect(service.checkCouponExistence).toBeTruthy();
  // }));
  //   it('should have updateFeedback function', inject([MessageService], (service: MessageService) => {
  //   expect(service.updateFeedback).toBeTruthy();
  // }));

});

