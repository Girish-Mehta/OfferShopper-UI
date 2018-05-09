import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule } from '@angular/common/http';
import { Wishlist } from './../configs/wishlist.config';

import { AuthorizationService } from './authorization.service';
import { WishlistService } from './wishlist.service';

xdescribe('WishlistService', () => {
	let mockBackend: MockBackend;

	beforeEach(async() => {

		TestBed.configureTestingModule({
			providers: [WishlistService,
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

  it('should be created', inject([WishlistService], (service: WishlistService) => {
    expect(service).toBeTruthy();
  }));



});
