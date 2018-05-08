import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AddOfferService } from './add-offer.service';

describe('AddOfferService', () => {
	let mockBackend: MockBackend;

	beforeEach(async() => {
		TestBed.configureTestingModule({
			providers: [AddOfferService,
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


	it('should be created', inject([AddOfferService], (service: AddOfferService) => {
		expect(service).toBeTruthy();
	}));

	it('should have getOffersList function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.getOffersList).toBeTruthy();
	}));
	it('should have deleteOffer function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.deleteOffer).toBeTruthy();
	}));
	it('should have updateOffer function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.updateOffer).toBeTruthy();
	}));
	it('should have putOffer function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.putOffer).toBeTruthy();
	}));
	it('should have addNewOffer function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.addNewOffer).toBeTruthy();
	}));
	it('should have addToRedis function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.addToRedis).toBeTruthy();
	}));
	it('should have addToSoundex function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.addToSoundex).toBeTruthy();
	}));
	it('should have couponValidateService function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.couponValidateService).toBeTruthy();
	}));
	it('should have changeFlag function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.changeFlag).toBeTruthy();
	}));
	it('should have putOffersInCarryBag function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.putOffersInCarryBag).toBeTruthy();
	}));
	it('should have getShopAddress function', inject([AddOfferService], (service: AddOfferService) => {
		expect(service.getShopAddress).toBeTruthy();
	}));

});
