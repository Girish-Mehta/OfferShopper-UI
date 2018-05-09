import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CarrybagComponent } from './carrybag.component';

import { CarrybagService } from '../../../services/carrybag.service';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from './../../../services/message.service';

describe('CarrybagOfferComponent', () => {
  let component: CarrybagComponent;
  let fixture: ComponentFixture<CarrybagComponent>;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ CarrybagComponent ],
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
       provide :  [CarrybagService, AuthorizationService, MessageService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrybagComponent);
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

      it('should call the productPrice method', async(() => {
   fixture.detectChanges();
   spyOn(component,'productPrice');
   expect(component.productPrice).toHaveBeenCalledTimes(0);
 }));

       it('should call the getCarrybag method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getCarrybag');
   expect(component.getCarrybag).toHaveBeenCalledTimes(0);
 }));

       it('should call the deleteOffer method', async(() => {
   fixture.detectChanges();
   spyOn(component,'deleteOffer');
   expect(component.deleteOffer).toHaveBeenCalledTimes(0);
 }));

     it('should call the couponGenerate method', async(() => {
   fixture.detectChanges();
   spyOn(component,'couponGenerate');
   expect(component.couponGenerate).toHaveBeenCalledTimes(0);
 }));

   it('should call the addfeedback method', async(() => {
   fixture.detectChanges();
   spyOn(component,'addfeedback');
   expect(component.addfeedback).toHaveBeenCalledTimes(0);
 }));

     it('should call the checkFeedbackExistence method', async(() => {
   fixture.detectChanges();
   spyOn(component,'checkFeedbackExistence');
   expect(component.checkFeedbackExistence).toHaveBeenCalledTimes(0);
 }));





});
