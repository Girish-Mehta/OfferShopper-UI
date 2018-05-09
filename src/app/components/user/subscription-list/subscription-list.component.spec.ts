import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { SubscriptionListComponent } from './subscription-list.component';
import { SubscribeService } from '../../../services/subscribe.service';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from './../../../services/message.service';

describe('SubscriptionListComponent', () => {
  let component: SubscriptionListComponent;
  let fixture: ComponentFixture<SubscriptionListComponent>;

       beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ SubscriptionListComponent ],
     imports: [
       BrowserModule,
       HttpClientModule,
       HttpModule,
       RouterTestingModule,
       FormsModule,
       ToastModule.forRoot(),
       ReactiveFormsModule,
       TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      })
     ],
     providers:[{
       provide :  [SubscribeService, AuthorizationService, MessageService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

     it('should call the getUserId method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getUserId');
   expect(component.getUserId).toHaveBeenCalledTimes(0);
 }));

      it('should call the getAllSubscriptions method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getAllSubscriptions');
   expect(component.getAllSubscriptions).toHaveBeenCalledTimes(0);
 }));

   it('should call the deleteSubscriptions method', async(() => {
   fixture.detectChanges();
   spyOn(component,'deleteSubscriptions');
   expect(component.deleteSubscriptions).toHaveBeenCalledTimes(0);
 }));


});
