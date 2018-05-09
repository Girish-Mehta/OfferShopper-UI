import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AddOfferService } from './add-offer.service';
import { OFFERS } from './add-offer-mockdata';

describe('AddOfferService', () => {
	let mockBackend: MockBackend;
	let offers : any;
	let coupons : any;
	let shopAddress : any;

	beforeEach(async() => {
		offers = null;
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


	//test cases for getOffersList positive
	it('check for getProfile function', async(inject([AddOfferService], (service : AddOfferService)=>{
		offers = OFFERS;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body: offers
				}
				)));
			});  
			//userId being passed
		  service.getOffersList('userId').subscribe(results=>{
			expect(results).toEqual(offers);
		  });
	})));

	//negative test for getProfile function
	it('negative check for getProfile function', async(inject([AddOfferService], (service : AddOfferService)=>{
		offers = OFFERS;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
					body : [
						null, 404
					],
				}
				)));
			});  
			//userId being passed
		  service.getOffersList('userId').subscribe(results=>{
			expect(results[1]).not.toEqual(200);
		  });
	})));

		//test for deleteOffer function
		it('check for deleteOffer function', async(inject([AddOfferService], (service : AddOfferService)=>{
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockRespond(new Response(
					new ResponseOptions({
						status : 200
					}
					)));
				});  
				//userId being passed
				service.deleteOffer('offerId').subscribe(results=>{
				expect(results).toEqual(200);
				});
		})));
	
	//negative test for deleteOffer function
	it('negative check for deleteOffer function', async(inject([AddOfferService], (service : AddOfferService)=>{
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
					status : 404
				}
				)));
			});  
			//userId being passed
		  service.getOffersList('userId').subscribe(results=>{
			expect(results).not.toEqual(200);
		  });
	})));

	//test for updateOffer function
	it('check for updateOffer function', async(inject([AddOfferService], (service : AddOfferService)=>{
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
					status : 200
				}
				)));
			});  
			//userId being passed
		  service.updateOffer('offerId').subscribe(results=>{
			expect(results).toEqual(200);
		  });
	})));

	//negative test for updateOffer function
	it('negative check for updateOffer function', async(inject([AddOfferService], (service : AddOfferService)=>{
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
					//offer not found
					status : 404
				}
				)));
			});  
			//userId being passed
		  service.updateOffer('offerId').subscribe(results=>{
			expect(results).not.toEqual(200);
		  });
	})));

		//test for addOffer function
		it('check for addNewOffer function', async(inject([AddOfferService], (service : AddOfferService)=>{
			offers = OFFERS;
			mockBackend.connections.subscribe(
				(connection: MockConnection) => {
					connection.mockRespond(new Response(
					new ResponseOptions({
						body : 201
					}
					)));
				});  
				service.addNewOffer(offers).subscribe(results=>{
				expect(results).toEqual(201);
				});
		})));

				//test for addToRedis function
				it('check for addToRedis function', async(inject([AddOfferService], (service : AddOfferService)=>{
					offers = OFFERS;
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : 201
							}
							)));
						});  
						service.addToRedis(offers).subscribe(results=>{
						expect(results).toEqual(201);
						});
				})));
		
				//test for addToSoundex function
				it('check for addToSoundex function', async(inject([AddOfferService], (service : AddOfferService)=>{
					offers = OFFERS;
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : 201
							}
							)));
						});  
						service.addToSoundex(offers).subscribe(results=>{
						expect(results).toEqual(201);
						});
				})));

				//test for couponValidateService function
				it('check for couponValidateService function', async(inject([AddOfferService], (service : AddOfferService)=>{
					//data that is getting matched
					coupons = {};
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : coupons
							}
							)));
						});  
						service.couponValidateService('coupon','vendorId').subscribe(results=>{
						expect(results).toEqual(coupons);
						});
				})));

				//negative test for couponValidateService function
				it('negative check for couponValidateService function', async(inject([AddOfferService], (service : AddOfferService)=>{
					//data that is getting matched
					coupons = {};
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : [null, 404]
							}
							)));
						});  
						service.couponValidateService('coupon','vendorId').subscribe(results=>{
						expect(results[1]).not.toEqual(200);
						});
				})));


				//test for changeFlag function
				it('check for changeFlag function', async(inject([AddOfferService], (service : AddOfferService)=>{
					//data that is getting matched
					coupons = {};
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : 201
							}
							)));
						});  
						service.changeFlag(coupons).subscribe(results=>{
						expect(results).toEqual(201);
						});
				})));
				
				
				//test for putOffersInCarryBag function
				it('check for putOffersInCarryBag function', async(inject([AddOfferService], (service : AddOfferService)=>{
					//data that is getting matched
					coupons = {};
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : 201
							}
							)));
						});  
						service.putOffersInCarryBag(coupons).subscribe(results=>{
						expect(results).toEqual(201);
						});
				})));

				//negative test for putOffersInCarryBag function
				it('negative check for putOffersInCarryBag function', async(inject([AddOfferService], (service : AddOfferService)=>{
					//data that is getting matched
					coupons = {};
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : 404
							}
							)));
						});  
						service.putOffersInCarryBag(coupons).subscribe(results=>{
						expect(results).not.toEqual(201);
						});
				})));

				//test for getShopAddress function
				it('check for getShopAddress function', async(inject([AddOfferService], (service : AddOfferService)=>{
					shopAddress = {};
					mockBackend.connections.subscribe(
						(connection: MockConnection) => {
							connection.mockRespond(new Response(
							new ResponseOptions({
								body : shopAddress
							}
							)));
						});  
						service.getShopAddress('userId').subscribe(results=>{
						expect(results).toEqual(shopAddress);
						});
				})));

					// negative test for getShopAddress function
					it('negative check for getShopAddress function', async(inject([AddOfferService], (service : AddOfferService)=>{
						shopAddress = {};
						mockBackend.connections.subscribe(
							(connection: MockConnection) => {
								connection.mockRespond(new Response(
								new ResponseOptions({
									body : [null, 404]
								}
								)));
							});  
							service.getShopAddress('userId').subscribe(results=>{
							expect(results[1]).not.toEqual(200);
							});
					})));
});
