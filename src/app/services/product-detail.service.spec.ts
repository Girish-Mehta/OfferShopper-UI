import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { ProductDetailService } from './product-detail.service';
import { OFFER_BY_ID, RELATED_PRODUCTS, PRODUCTS_OF_A_VENDOR } from './product-detail-mockdata'

describe('ProductDetailService', () => {
  let offerResult:any;
  let negOfferResult:any;
  let relatedProducts: any
  let negRelatedProducts: any
  let products_of_a_vendor: any
  let neg_products_of_a_vendor: any

  let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailService,
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
    offerResult=OFFER_BY_ID;
    negOfferResult={};
    relatedProducts=RELATED_PRODUCTS;
    negRelatedProducts=[];
    products_of_a_vendor= PRODUCTS_OF_A_VENDOR
    neg_products_of_a_vendor= [];
  });


  it('should be created', inject([ProductDetailService], (service: ProductDetailService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getOfferById function', inject([ProductDetailService], (service: ProductDetailService) => {
    expect(service.getOfferById).toBeTruthy();
  }));

  it('should have searchProduct function', inject([ProductDetailService], (service: ProductDetailService) => {
    expect(service.searchProduct).toBeTruthy();
  }));

  it('should have searchRelatedProducts function', inject([ProductDetailService], (service: ProductDetailService) => {
    expect(service.searchRelatedProducts).toBeTruthy();
  }));



  it('check for getOfferById function and should return an offer', async(inject([ProductDetailService], (service: ProductDetailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: offerResult
          }
          )));
      });  
    service.getOfferById('offer-204').subscribe(results=>{
      expect(results).toEqual(offerResult);
    });
  })));


  it('is a negative check for getOfferById function', async(inject([ProductDetailService], (service: ProductDetailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: negOfferResult
          }
          )));
      });  
    service. getOfferById('offer-204').subscribe(results=>{
      expect(results).not.toEqual(offerResult);
    });
  })));

  it('check for relatedProducts function', async(inject([ProductDetailService], (service: ProductDetailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: relatedProducts
          }
          )));
      });  
    service.searchRelatedProducts('clothings').subscribe(results=>{
      expect(results).toEqual(relatedProducts);
    });
  })));

  it('negative check for relatedProducts function', async(inject([ProductDetailService], (service: ProductDetailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: negRelatedProducts
          }
          )));
      });  
    service.searchRelatedProducts('clothings').subscribe(results=>{
      expect(results).not.toEqual(relatedProducts);
    });
  })));

  it('check for searchProduct function', async(inject([ProductDetailService], (service: ProductDetailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: products_of_a_vendor
          }
          )));
      });  
    service.searchProduct('clothings').subscribe(results=>{
      expect(results).toEqual(products_of_a_vendor);
    });
  })));

  it('negative check for searchProduct function', async(inject([ProductDetailService], (service: ProductDetailService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: neg_products_of_a_vendor
          }
          )));
      });  
    service.searchProduct('clothings').subscribe(results=>{
      expect(results).not.toEqual(products_of_a_vendor);
    });
  })));

});
