import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader,TranslateService} from "ng2-translate";
import { MissingTranslationHandler } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { VendorPageComponent } from './vendor-page.component';
import { OffersService } from '../../services/offers.service';
import { SubscribeService } from '../../services/subscribe.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';
import { WishlistService } from './../../services/wishlist.service';
import { FeedbackService } from './../../services/feedback.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; 

describe('VendorPageComponent', () => {
  let component: VendorPageComponent;
  let fixture: ComponentFixture<VendorPageComponent>;
  let debug: DebugElement;
  let el: HTMLElement;
     beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ VendorPageComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
     imports: [
       BrowserModule,
       HttpClientModule,
       NgxPaginationModule,
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
     providers:[
TranslateService, OffersService,AuthorizationService,MessageService,SubscribeService,WishlistService,FeedbackService] 
    
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

   it('should call the getUserId method',() => {
   spyOn(component,'getUserId');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.getUserId).toHaveBeenCalledTimes(0);
 })

   it('should call the getOfferlist method',() => {
   spyOn(component,'getOfferlist');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.getOfferlist).toHaveBeenCalledTimes(0);
 })

   it('should call the productPrice method',() => {
   spyOn(component,'productPrice');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.productPrice).toHaveBeenCalledTimes(0);
 })


   it('should call the getFeedback method',() => {
   spyOn(component,'getFeedback');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.getFeedback).toHaveBeenCalledTimes(0);
 })

   it('should call the initMap method',() => {
   spyOn(component,'initMap');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.initMap).toHaveBeenCalledTimes(0);
 })


   it('should call the addToCarrybag method',() => {
   spyOn(component,'addToCarrybag');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.addToCarrybag).toHaveBeenCalledTimes(0);
 })

   it('should call the notLogin method',() => {
   spyOn(component,'notLogin');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.notLogin).toHaveBeenCalledTimes(1);
 })

   it('should call the subscribe method',() => {
   spyOn(component,'subscribe');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.subscribe).toHaveBeenCalledTimes(0);
 })

   it('should call the addToWishlist method',() => {
   spyOn(component,'addToWishlist');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.addToWishlist).toHaveBeenCalledTimes(0);
 })

});
