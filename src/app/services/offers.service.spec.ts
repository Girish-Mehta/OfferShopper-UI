import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';


import { OffersService } from './offers.service';
import { PRODUCTS_OF_A_VENDOR, NEG_PRODUCTS_OF_A_VENDOR, OFFER_BY_ID } from './product-detail-mockdata';

describe('OffersService', () => {
  let mockBackend: MockBackend;
  let offerResult:any;
  let products_of_a_vendor:any;
  let  neg_products_of_a_vendor:any;
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [OffersService,
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
    products_of_a_vendor= [];
    offerResult=OFFER_BY_ID;

    neg_products_of_a_vendor=NEG_PRODUCTS_OF_A_VENDOR;
})
it('neg check for getOffers function', async(inject([OffersService], (service: OffersService) => {
  mockBackend.connections.subscribe(
    (connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: neg_products_of_a_vendor
        }
        )));
    });  
  service.getOffers('vendorId').subscribe(results=>{
    expect(results).not.toEqual([{}]);
  });
})));


// it('check for addToCarrybag function', async(inject([OffersService], (service: OffersService) => {
//   mockBackend.connections.subscribe(
//     (connection: MockConnection) => {
//       connection.mockRespond(new Response(
//         new ResponseOptions({
//           body: true
//         }
//         )));
//     });  
//   service.addToCarrybag('vendorId').subscribe(results=>{
//     expect(results).not.toEqual(true);
//   });
// })));

// it('neg check for addToCarrybag function', async(inject([OffersService], (service: OffersService) => {
//   mockBackend.connections.subscribe(
//     (connection: MockConnection) => {
//       connection.mockRespond(new Response(
//         new ResponseOptions({
//           body: false
//         }
//         )));
//     });  
//   service.addToCarrybag('vendorId').subscribe(results=>{
//     expect(results).not.toEqual(true);
//   });
// })));

it('check for getOffersByOfferId function', async(inject([OffersService], (service: OffersService) => {
  mockBackend.connections.subscribe(
    (connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: offerResult
        }
        )));
    });  
  service.getOffersByOfferId('vendorId').subscribe(results=>{
    expect(results).toEqual(offerResult);
  });
})));

it('check for getOffersByOfferId function', async(inject([OffersService], (service: OffersService) => {
  mockBackend.connections.subscribe(
    (connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: offerResult
        }
        )));
    });  
  service.getOffersByOfferId('vendorId').subscribe(results=>{
    expect(results).not.toEqual({});
  });
})));

it('check for getOffersByLocation function', async(inject([OffersService], (service: OffersService) => {
  mockBackend.connections.subscribe(
    (connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: offerResult
        }
        )));
    });  
  service.getOffersByLocation('vendorId').subscribe(results=>{
    expect(results).toEqual(offerResult);
  });
})));

it('neg check for getOffersByLocation function', async(inject([OffersService], (service: OffersService) => {
  mockBackend.connections.subscribe(
    (connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: offerResult
        }
        )));
    });  
  service.getOffersByLocation('vendorId').subscribe(results=>{
    expect(results).not.toEqual({});
  });
})));

});
