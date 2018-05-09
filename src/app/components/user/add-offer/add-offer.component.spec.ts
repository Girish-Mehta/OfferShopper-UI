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
import { AddOfferComponent } from './add-offer.component';
import { AddOfferService } from '../../../services/add-offer.service';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from '../../../services/message.service';

describe('AddOfferComponent', () => {
  let component: AddOfferComponent;
  let fixture: ComponentFixture<AddOfferComponent>;

      beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ AddOfferComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
     imports: [
       BrowserModule,
       HttpClientModule,
       HttpModule,
       RouterTestingModule,
       FormsModule,
      ToastModule.forRoot(),
   //    ReactiveFormsModule,
       TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      })
     ],
     providers:[AddOfferService, AuthorizationService, MessageService]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferComponent);
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

      it('should call the getOffers method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getOffers');
   expect(component.getOffers).toHaveBeenCalledTimes(0);
 }));

       it('should call the deleteOffer method', async(() => {
   fixture.detectChanges();
   spyOn(component,'deleteOffer');
   expect(component.deleteOffer).toHaveBeenCalledTimes(0);
 }));

        it('should call the reset method', async(() => {
   fixture.detectChanges();
   spyOn(component,'reset');
   expect(component.reset).toHaveBeenCalledTimes(0);
 }));

         it('should call the updateOffer method', async(() => {
   fixture.detectChanges();
   spyOn(component,'updateOffer');
   expect(component.updateOffer).toHaveBeenCalledTimes(0);
 }));

        it('should call the getOffer method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getOffer');
   expect(component.getOffer).toHaveBeenCalledTimes(0);
 }));

     it('should call the addOffer method', async(() => {
   fixture.detectChanges();
   spyOn(component,'addOffer');
   expect(component.addOffer).toHaveBeenCalledTimes(0);
 }));

     it('should call the couponValidate method', async(() => {
   fixture.detectChanges();
   spyOn(component,'couponValidate');
   expect(component.couponValidate).toHaveBeenCalledTimes(0);
 }));

});
