import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { MessageService } from '../../services/message.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement,ViewContainerRef } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import { ForgotPasswordComponent } from './forgot-password.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let debug: DebugElement;
  let el: HTMLElement;
  let submitEl:DebugElement;
  let loginEl:DebugElement;

     beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ForgotPasswordComponent ],
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
       provide :  [ ForgotPasswordService, MessageService,ViewContainerRef ] 
     }]
   })
   .compileComponents();
 }));



 beforeEach(() => {
   fixture = TestBed.createComponent(ForgotPasswordComponent);
   component = fixture.componentInstance;
   debug=fixture.debugElement.query(By.css('form'));
   el=debug.nativeElement;
   fixture.detectChanges();
   submitEl = fixture.debugElement.query(By.css('button'));
   loginEl = fixture.debugElement.query(By.css('input[type=email]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call the forgot method',() => {
   spyOn(component,'forgot');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.forgot).toHaveBeenCalledTimes(0);
 })

    it('registerForm should be invalid',() => {
   component.registerForm.controls['username'].setValue('');
   expect(component.registerForm.valid).toBeFalsy();
 });

   it('registerForm should be valid',() => {
   component.registerForm.controls['username'].setValue('girish@gmail.com');
   expect(component.registerForm.valid).toBeTruthy();
 });

it('form invalid when empty', () => {
  expect(component.registerForm.valid).toBeFalsy();
});


it('submitting a form emits a user', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['username'].setValue("test@test.com");
    expect(component.registerForm.valid).toBeTruthy();
});

});

