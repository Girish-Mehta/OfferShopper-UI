import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AuthorizationService } from './authorization.service';


describe('AuthorizationService', () => {
let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService,
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


  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getToken function', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.getToken).toBeTruthy();
  }));
    it('should have isLogin function', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.isLogin).toBeTruthy();
  }));
    it('should have getUserId function', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.getUserId).toBeTruthy();
  }));
  it('should have logout function', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.logout).toBeTruthy();
  }));

});
