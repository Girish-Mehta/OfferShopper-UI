import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';

import { MessageService } from './message.service';

describe('MessageService', () => {
let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [MessageService, ToastsManager,
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
      imports : [HttpClientModule,HttpModule,ToastModule.forRoot()]
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

});

