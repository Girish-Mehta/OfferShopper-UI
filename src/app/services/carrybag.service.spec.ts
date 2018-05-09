import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { CarrybagService } from './carrybag.service';

import { CARRY_BAG_LIST ,NEW_COUPON_OBJ,COUPON_CHECK,UPDATE_FEEDBACK,ADD_TO_CARRYBAG} from './carrybag-service-mockdata';


describe('CarrybagService', () => {
let mockBackend: MockBackend;
let carrybagList :any;
let negativeCarrybagList:any;
let newCouponObj:any;
let negativeNewCouponObj:any;
let couponCheck:any;
let negativeCouponCheck:any;
let updateFeedback:any;
let negativeUpdateFeedback:any;
let addToCarrybagObj:any;
let negativeAddToCarrybagObj:any;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [CarrybagService,
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
    carrybagList=CARRY_BAG_LIST ;
    negativeCarrybagList=[];
    newCouponObj=NEW_COUPON_OBJ;
    negativeNewCouponObj=[];
    couponCheck=COUPON_CHECK;
    negativeCouponCheck=[];
    updateFeedback=UPDATE_FEEDBACK;
    negativeUpdateFeedback=[];
    addToCarrybagObj=ADD_TO_CARRYBAG;
    negativeAddToCarrybagObj=[];

  });


  it('should be created', inject([CarrybagService], (service: CarrybagService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getCarrybaglist function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.getCarrybaglist).toBeTruthy();
  }));
    it('should have deleteCarrybag function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.deleteCarrybag).toBeTruthy();
  }));
    it('should have newCouponGenerate function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.newCouponGenerate).toBeTruthy();
  }));
  it('should have checkCouponExistence function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.checkCouponExistence).toBeTruthy();
  }));
    it('should have updateFeedback function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.updateFeedback).toBeTruthy();
  }));
    it('should have addToCarrybag function', inject([CarrybagService], (service: CarrybagService) => {
    expect(service.addToCarrybag).toBeTruthy();
  }));

  it('check for getCarrybagList function and should return a list of offers', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: carrybagList
          }
          )));
      });  
    service.getCarrybaglist('kumarmukesh3774@gmail.com').subscribe(results=>{
      expect(results).toEqual(carrybagList);
    });
  })));

  it('negative check for getCarrybagList function and should return a list of offers', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: negativeCarrybagList
          }
          )));
      });  
    service.getCarrybaglist('kumarmukesh3774@gmail.com').subscribe(results=>{
      expect(results).not.toEqual(carrybagList);
    });
  })));


  it(' check for deleteCarrybag function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:200 
          }
          )));
      });  
    service.deleteCarrybag('5af03f0889a32a672b88d692','kumarmukesh3774@gmail.com').subscribe(results=>{
      expect(results).toEqual(200);
    });
  })));

  it(' negative check for deleteCarrybag function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            status:200 
          }
          )));
      });  
    service.deleteCarrybag('5af03f0889a32a672b88d692','kumarmukesh3774@gmail.com').subscribe(results=>{
      expect(results).not.toEqual(400);
    });
  })));

  it(' check for newCouponGenerate function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body: newCouponObj,
            status:200
          }
          )));
      });  
    service.newCouponGenerate(newCouponObj).subscribe(results=>{
      expect(results).toEqual(newCouponObj);
      //expect(results).toEqual(200);      
    });
  })));

  it('negative check for newCouponGenerate function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body: newCouponObj,
            status:200
          }
          )));
      });  
    service.newCouponGenerate(newCouponObj).subscribe(results=>{
      expect(results).not.toEqual(negativeNewCouponObj);
      //expect(results).toEqual(200);      
    });
  })));
  it(' check for checkCouponExistence function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body: couponCheck,
            status:200
          }
          )));
      });  
    service.checkCouponExistence('kumarmukesh3774@gmail.com','5af03e8689a32a672b88d690').subscribe(results=>{
      expect(results).toEqual(couponCheck);
      //expect(results).toEqual(200);      
    });
  })));

  it('negative check for checkCouponExistence function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body: negativeCouponCheck,
            status:200
          }
          )));
      });  
    service.checkCouponExistence('kumarmukesh3774@gmail.com','5af03e8689a32a672b88d690').subscribe(results=>{
      expect(results).not.toEqual(couponCheck);
      //expect(results).toEqual(200);      
    });
  })));



  it(' check for updateFeedback function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body: updateFeedback,
            status:200
          }
          )));
      });  
    service.updateFeedback(updateFeedback).subscribe(results=>{
      expect(results).toEqual(updateFeedback);
      //expect(results).toEqual(200);      
    });
  })));

  it('negative check for updateFeedback function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            body: negativeCouponCheck,
            status:200
          }
          )));
      });  
    service.updateFeedback(updateFeedback).subscribe(results=>{
      expect(results).not.toEqual(updateFeedback);
      //expect(results).toEqual(200);      
    });
  })));


  it(' check for addToCarrybag function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            status:200
          }
          )));
      });  
    service.addToCarrybag(addToCarrybagObj).subscribe(results=>{
      //expect(results).toEqual(addToCarrybagObj);
      expect(results).toEqual(200);      
    });
  })));

  it('negative check for addToCarrybag function and return status OK', async(inject([CarrybagService], (service: CarrybagService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
          connection.mockRespond(new Response(
          new ResponseOptions({
            status:200
          }
          )));
      });  
    service.addToCarrybag(addToCarrybagObj).subscribe(results=>{
     // expect(results).not.toEqual(addToCarrybagObj);
      expect(results).not.toEqual(400);      
    });
  })));


});



