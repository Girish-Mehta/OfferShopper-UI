import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from './user.service';
import { USER_PROFILE,VENDOR_BY_LOCATION } from './user-service-mockdata';  

describe('UserService', () => {
	let mockBackend: MockBackend;

	let user : any;
	let vendorByLocation;

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
		user =null;
		vendorByLocation = null;
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

	//checking if data is being retrieved for getProfile function
	it('check for getProfile function', async(inject([UserService], (service : UserService)=>{
		user = USER_PROFILE;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body: user
				}
				)));
			});  
			//userId being passed
		  service.getProfile('userId').subscribe(results=>{
			expect(results).toEqual(user);
		  });
	})));

	//check for getProfile function negative test
	it('negative check for getProfile function', async(inject([UserService], (service : UserService)=>{
		user = USER_PROFILE;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body: null
				}
				)));
			});  
			//userId being passed
		  service.getProfile('userId').subscribe(results=>{
			expect(results).not.toEqual(user);
		  });
	})));

	//checking vendorByCity function positive test
	it('check for getVendorByCity function', async(inject([UserService], (service : UserService)=>{
		vendorByLocation = VENDOR_BY_LOCATION;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body: vendorByLocation
				}
				)));
			});  
			//userId being passed
		  service.getVendorByCity('gurgaon').subscribe(results=>{
			expect(results).toEqual(vendorByLocation);
		  });
	})));

	//checking vendorByCity function negative test
	it('negative check for getVendorByCity function', async(inject([UserService], (service : UserService)=>{
		vendorByLocation = VENDOR_BY_LOCATION;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body: null
				}
				)));
			});  
			//userId being passed
		  service.getVendorByCity('gurgaon').subscribe(results=>{
			expect(results).not.toEqual(vendorByLocation);
		  });
	})));

	// testing putProfile function test
	it('check for putProfile function', async(inject([UserService], (service : UserService)=>{
		user = USER_PROFILE;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  status : 201
				}
				)));
			});  
			//userId being passed
		  service.putProfile(user).subscribe(results=>{
			expect(results).toEqual(201);
		  });
	})));

	// negative testing putProfile function test
	it('negative check for putProfile function', async(inject([UserService], (service : UserService)=>{
		//user doesnt exits
		user = null;
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  status : 404
				}
				)));
			});  
			//userId being passed
		  service.putProfile(user).subscribe(results=>{
			expect(results).not.toEqual(201);
		  });
	})));
});