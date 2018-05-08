import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from './user.service';

describe('UserService', () => {
	let mockBackend: MockBackend;

	beforeEach(async() => {
		TestBed.configureTestingModule({
			providers: [UserService,
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


	it('should be created', inject([UserService], (service: UserService) => {
		expect(service).toBeTruthy();
	}));

	it('should have getProfile function', inject([UserService], (service: UserService) => {
		expect(service.getProfile).toBeTruthy();
	}));
	it('should have putProfile function', inject([UserService], (service: UserService) => {
		expect(service.putProfile).toBeTruthy();
	}));
	it('should have convertToVendor function', inject([UserService], (service: UserService) => {
		expect(service.convertToVendor).toBeTruthy();
	}));
	it('should have getVendorByCity function', inject([UserService], (service: UserService) => {
		expect(service.getVendorByCity).toBeTruthy();
	}));

});