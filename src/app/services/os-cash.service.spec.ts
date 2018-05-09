import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import { OsCashService } from './os-cash.service';

describe('OsCashService', () => {
  let mockBackend: MockBackend;

  beforeEach(async() => {
		TestBed.configureTestingModule({
			providers: [OsCashService,
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


  it('should be created', inject([OsCashService], (service: OsCashService) => {
    expect(service).toBeTruthy();
  }));

  	// testing putOffer function
	it('check for putProfile function', async(inject([OsCashService], (service : OsCashService)=>{
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body : 201
				}
				)));
			});  
			//userId being passed
		  service.putOffer(4,'').subscribe(results=>{
			expect(results).toEqual(201);
		  });
	})));

  	//negative testing putOffer function
	it('negative check for putProfile function', async(inject([OsCashService], (service : OsCashService)=>{
		mockBackend.connections.subscribe(
			(connection: MockConnection) => {
			  connection.mockRespond(new Response(
				new ResponseOptions({
				  body : 404
				}
				)));
			});  
			//userId being passed
		  service.putOffer(4,'').subscribe(results=>{
			expect(results).not.toEqual(201);
		  });
	})));

});