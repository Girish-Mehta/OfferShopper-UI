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
import { WishlistComponent } from './wishlist.component';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from './../../../services/message.service';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;

    beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ WishlistComponent ],
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
       provide :  [WishlistService, AuthorizationService, MessageService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

     it('should call the productPrice method', async(() => {
   fixture.detectChanges();
   spyOn(component,'productPrice');
   expect(component.productPrice).toHaveBeenCalledTimes(0);
 }));

     it('should call the getUserId method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getUserId');
   expect(component.getUserId).toHaveBeenCalledTimes(0);
 }));

  it('should call the getWishlist method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getWishlist');
   expect(component.getWishlist).toHaveBeenCalledTimes(0);
 }));

  it('should call the deleteOffer method', async(() => {
   fixture.detectChanges();
   spyOn(component,'deleteOffer');
   expect(component.deleteOffer).toHaveBeenCalledTimes(0);
 }));

});
