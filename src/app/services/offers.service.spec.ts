// import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
// import {MockBackend, MockConnection} from '@angular/http/testing';
// import {HttpModule, ResponseOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
// import {HttpClientModule} from '@angular/common/http';

// import { OffersService } from './offers.service';
// import { PRODUCTS_OF_A_VENDOR, NEG_PRODUCTS_OF_A_VENDOR } from './product-detail-mockdata';

// xdescribe('OffersService', () => {
//   let mockBackend: MockBackend;
//   let products_of_a_vendor:any;
//   let  neg_products_of_a_vendor:any;
//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//       providers: [OffersService,
//       MockBackend,
//       BaseRequestOptions,
//       {
//         provide: Http,
//         deps: [MockBackend, BaseRequestOptions],
//         useFactory:
//         (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
//           return new Http(backend, defaultOptions);
//         }
//       }],
//       imports : [HttpClientModule,HttpModule],
//     });
//     mockBackend = getTestBed().get(MockBackend);
//     products_of_a_vendor= []
//     neg_products_of_a_vendor=NEG_PRODUCTS_OF_A_VENDOR;

//   });
//   it('should be created', inject([OffersService], (service: OffersService) => {
//     expect(service).toBeTruthy();
//   }));

//   it('should have getOffers function', inject([OffersService], (service: OffersService) => {
//     expect(service.getOffers).toBeTruthy();
//   }));

//   it('should have getAddress function', inject([OffersService], (service: OffersService) => {
//     expect(service.getAddress).toBeTruthy();
//   }));

//   it('should have addToCarrybag function', inject([OffersService], (service: OffersService) => {
//     expect(service.addToCarrybag).toBeTruthy();
//   }));

//   it('check for getOffers function', async(inject([OffersService], (service: OffersService) => {
//     mockBackend.connections.subscribe(
//       (connection: MockConnection) => {
//         connection.mockRespond(new Response(
//           new ResponseOptions({
//             body: products_of_a_vendor
//           }
//           )));
//       });  
//     service.getOffers('vendorId').subscribe(results=>{
//       expect(results).toEqual(products_of_a_vendor);
//     });
//   })));

//   it('check for getOffers function', async(inject([OffersService], (service: OffersService) => {
//     mockBackend.connections.subscribe(
//       (connection: MockConnection) => {
//         connection.mockRespond(new Response(
//           new ResponseOptions({
//             body: neg_products_of_a_vendor
//           }
//           )));
//       });  
//     service.getOffers('vendorId').subscribe(results=>{
//       expect(results).not.toEqual([{}]);
//     });
//   })));

//   it('check for addToCarrybag function', async(inject([OffersService], (service: OffersService) => {
//     mockBackend.connections.subscribe(
//       (connection: MockConnection) => {
//         connection.mockRespond(new Response(
//           new ResponseOptions({
//             body: 'offerResult'
//           }
//           )));
//       });  
//     service.addToCarrybag('vendorId').subscribe(results=>{
//       expect(results).toEqual('offerResult');
//     });
//   })));

//   // it('neg check for addToCarrybag function', async(inject([OffersService], (service: OffersService) => {
//   //   mockBackend.connections.subscribe(
//   //     (connection: MockConnection) => {
//   //       connection.mockRespond(new Response(
//   //         new ResponseOptions({
//   //           body: 'negofferResult'
//   //         }
//   //         )));
//   //     });  
//   //   service.addToCarrybag('vendorId').subscribe(results=>{
//   //     expect(results).toEqual('offerResult');
//   //   });
//   // })));

//   // it('check for getAddress function', async(inject([OffersService], (service: OffersService) => {
//   //   mockBackend.connections.subscribe(
//   //     (connection: MockConnection) => {
//   //       connection.mockRespond(new Response(
//   //         new ResponseOptions({
//   //           body: 'offerResult'
//   //         }
//   //         )));
//   //     });  
//   //   service.getAddress('street','city','state','zip').subscribe(results=>{
//   //     expect(results).toEqual('offerResult');
//   //   });
//   // })));

//   // it('neg check for getAddress function', async(inject([OffersService], (service: OffersService) => {
//   //   mockBackend.connections.subscribe(
//   //     (connection: MockConnection) => {
//   //       connection.mockRespond(new Response(
//   //         new ResponseOptions({
//   //           body: 'negofferResult'
//   //         }
//   //         )));
//   //     });  
//   //   service.getAddress('street','city','state','zip').subscribe(results=>{
//   //     expect(results).toEqual('offerResult');
//   //   });
//   // })));

// });
