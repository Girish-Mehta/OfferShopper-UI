import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {LoginService} from '../../services/login.service';
import {RegisterService} from '../../services/register.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginRegisterFrontpageComponent } from './login-register-frontpage.component';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';

describe('LoginRegisterFrontpageComponent', () => {
  let component: LoginRegisterFrontpageComponent;
  let fixture: ComponentFixture<LoginRegisterFrontpageComponent>;
  let debug: DebugElement;
  let el: HTMLElement;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ LoginRegisterFrontpageComponent ],
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
       provide :  [RegisterService,LoginService] 
     }]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(LoginRegisterFrontpageComponent);
   component = fixture.componentInstance;
   debug=fixture.debugElement.query(By.css('form'));
   el=debug.nativeElement;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should call the login method',() => {
   spyOn(component,'login');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.login).toHaveBeenCalledTimes(0);
 })

  it('should call the registerUser method',() => {
   spyOn(component,'registerUser');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.registerUser).toHaveBeenCalledTimes(0);
 });

   it('loginForm should be invalid',() => {
   component.loginForm.controls['username'].setValue('');
   component.loginForm.controls['password'].setValue('');
   expect(component.loginForm.valid).toBeFalsy();
 });

   it('registerForm should be invalid',() => {
   component.registerForm.controls['username'].setValue('');
   component.registerForm.controls['password'].setValue('');
   component.registerForm.controls['rePassword'].setValue('');
   expect(component.registerForm.valid).toBeFalsy();
 });

   it('loginForm should be valid',() => {
   component.loginForm.controls['username'].setValue('girish@gmail.com');
   component.loginForm.controls['password'].setValue('12345@Aa');
   expect(component.loginForm.valid).toBeTruthy();
 });

     it('registerForm should be valid',() => {
   component.registerForm.controls['username'].setValue('asd@gmail.com');
   component.registerForm.controls['password'].setValue('Dinesh@123');
   component.registerForm.controls['rePassword'].setValue('Dinesh@123');
   expect(component.registerForm.valid).toBeTruthy();
 });


});


