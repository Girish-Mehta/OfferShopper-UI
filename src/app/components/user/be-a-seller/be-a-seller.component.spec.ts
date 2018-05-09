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
import { BeASellerComponent } from './be-a-seller.component';
import{UserService} from './../../../services/user.service';
import { AuthorizationService } from '../../../services/authorization.service';

describe('BeASellerComponent', () => {
  let component: BeASellerComponent;
  let fixture: ComponentFixture<BeASellerComponent>;

       beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ BeASellerComponent ],
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
       provide :  [AuthorizationService,UserService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeASellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 //     it('should call the setCheckboxAddress method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'setCheckboxAddress');
 //   expect(component.setCheckboxAddress).toHaveBeenCalledTimes(0);
 // }));

 //      it('should call the setShopAddress method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'setShopAddress');
 //   expect(component.setShopAddress).toHaveBeenCalledTimes(0);
 // }));

 //       it('should call the submit method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'submit');
 //   expect(component.submit).toHaveBeenCalledTimes(0);
 // }));

 //        it('should call the undisableTxt method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'undisableTxt');
 //   expect(component.undisableTxt).toHaveBeenCalledTimes(0);
 // }));

 //         it('should call the getProfile method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'getProfile');
 //   expect(component.getProfile).toHaveBeenCalledTimes(0);
 // }));

 //        it('should call the getUserId method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'getUserId');
 //   expect(component.getUserId).toHaveBeenCalledTimes(0);
 // }));
});
