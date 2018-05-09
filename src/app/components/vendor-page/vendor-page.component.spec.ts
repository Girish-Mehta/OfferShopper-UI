import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { VendorPageComponent } from './vendor-page.component';
import { OffersService } from '../../services/offers.service';
import { SubscribeService } from '../../services/subscribe.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';
import { WishlistService } from './../../services/wishlist.service';
import { FeedbackService } from './../../services/feedback.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

describe('VendorPageComponent', () => {
  let component: VendorPageComponent;
  let fixture: ComponentFixture<VendorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPageComponent ]
    })
    .compileComponents();
  }));

     beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ VendorPageComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
       provide :  [OffersService,AuthorizationService,MessageService,SubscribeService,WishlistService,FeedbackService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
