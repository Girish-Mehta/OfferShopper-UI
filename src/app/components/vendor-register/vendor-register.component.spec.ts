import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { MessageService } from '../../services/message.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement,ViewContainerRef } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { VendorRegisterComponent } from './vendor-register.component';
import {RegisterService} from '../../services/register.service';

describe('VendorRegisterComponent', () => {
  let component: VendorRegisterComponent;
  let fixture: ComponentFixture<VendorRegisterComponent>;
    let debug: DebugElement;
  let el: HTMLElement;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ VendorRegisterComponent ],
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
       provide :  [ RegisterService ] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRegisterComponent);
    component = fixture.componentInstance;
   debug=fixture.debugElement.query(By.css('form'));
   el=debug.nativeElement;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the findRelevantCitiesHome method',() => {
   spyOn(component,'findRelevantCitiesHome');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.findRelevantCitiesHome).toHaveBeenCalledTimes(0);
 });

    it('should call the findRelevantCitiesShop method',() => {
   spyOn(component,'findRelevantCitiesShop');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.findRelevantCitiesShop).toHaveBeenCalledTimes(0);
 });

   it('should call the registerVendor method',() => {
   spyOn(component,'registerVendor');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.registerVendor).toHaveBeenCalledTimes(0);
 });

   it('should call the setAddress method',() => {
   spyOn(component,'setAddress');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.setAddress).toHaveBeenCalledTimes(0);
 });

   it('form should be invalid',() => {
   component.form.controls['firstName'].setValue('');
   component.form.controls['lastName'].setValue('');
   component.form.controls['email'].setValue('');
   component.form.controls['password'].setValue('');
   component.form.controls['vendorAddress'].setValue('');
   component.form.controls['vendorCity'].setValue('');
   component.form.controls['vendorState'].setValue('');
   component.form.controls['vendorZip'].setValue('');
  component.form.controls['vendorContact'].setValue('');
   expect(component.form.valid).toBeFalsy();
 });

   it('form should be valid',() => {
   component.form.controls['firstName'].setValue('Dinesh');
   component.form.controls['lastName'].setValue('Verma');
   component.form.controls['email'].setValue('dineshverma3008@gmail.com');
   component.form.controls['password'].setValue('Dinesh@123');
   component.form.controls['vendorAddress'].setValue('151/5');
   component.form.controls['vendorCity'].setValue('Patiala');
   component.form.controls['vendorState'].setValue('Punjab');
   component.form.controls['vendorZip'].setValue('147003');
  component.form.controls['vendorContact'].setValue('8725029009');
   expect(component.form.valid).toBeTruthy();
 });

});
