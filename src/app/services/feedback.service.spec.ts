import { TestBed, inject, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers, BaseRequestOptions,Response,Http, XHRBackend, RequestMethod} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { FeedbackService } from './feedback.service';
import { FEEDBACK_BY_ID } from './../services/feedback-service-mockdata';
describe('FeedbackService', () => {
 let feedbackResult:any;
 let mockBackend: MockBackend;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [FeedbackService,
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
    feedbackResult=FEEDBACK_BY_ID;

  });


  it('should be created', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));

  it('should have getFeed function', inject([FeedbackService], (service: FeedbackService) => {
    expect(service.getFeed).toBeTruthy();
  }));

  it('check for getFeedback function and should return an feedback', async(inject([FeedbackService], (service: FeedbackService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: feedbackResult
          }
          )));
      });  
    service.getFeed('string').subscribe(results=>{
      expect(results).toEqual(feedbackResult);
    });
  })));

  it('negative test case to check for getFeedback function and should return an feedback', async(inject([FeedbackService], (service: FeedbackService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
          status : 404
         }
          )));
      });  
    service.getFeed('string').subscribe(results=>{
      expect(results).not.toEqual(200);
    });
  })));

});
