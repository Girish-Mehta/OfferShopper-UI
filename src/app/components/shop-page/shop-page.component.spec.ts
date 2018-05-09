import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement,ViewContainerRef } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { LocationService } from '../../services/location.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ShopPageComponent } from './shop-page.component';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';

describe('ShopPageComponent', () => {
  let component: ShopPageComponent;
  let fixture: ComponentFixture<ShopPageComponent>;
    let debug: DebugElement;
  let el: HTMLElement;

       beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ShopPageComponent ],
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
       provide :  [ SearchService, UserService,LocationService ] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPageComponent);
    component = fixture.componentInstance;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should call the loadOffers method', async(() => {
   fixture.detectChanges();
   spyOn(component,'loadOffers');
   expect(component.loadOffers).toHaveBeenCalledTimes(0);
 }));

  it('should call the sortBy method', async(() => {
   fixture.detectChanges();
   spyOn(component,'sortBy');
   expect(component.sortBy).toHaveBeenCalledTimes(0);
 }));

   it('should call the onFinish method', async(() => {
   fixture.detectChanges();
   spyOn(component,'onFinish');
   expect(component.onFinish).toHaveBeenCalledTimes(0);
 }));

      it('should call the getVendors method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getVendors');
   expect(component.getVendors).toHaveBeenCalledTimes(0);
 }));

});
