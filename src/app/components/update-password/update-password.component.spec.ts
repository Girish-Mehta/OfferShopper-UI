import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { UpdatePasswordComponent } from './update-password.component';
import { UpdatePasswordService } from '../../services/update-password.service';
import { MessageService } from '../../services/message.service';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
    let debug: DebugElement;
  let el: HTMLElement;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ UpdatePasswordComponent ],
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
       provide :  [ UpdatePasswordService, MessageService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
   debug=fixture.debugElement.query(By.css('form'));
   el=debug.nativeElement;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call the updatePassword method',() => {
   spyOn(component,'updatePassword');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.updatePassword).toHaveBeenCalledTimes(0);
 });

    it('updatePass should be invalid',() => {
   component.updatePass.controls['password'].setValue('');
   component.updatePass.controls['rePassword'].setValue('');
   expect(component.updatePass.valid).toBeFalsy();
 });

   it('updatePass should be valid',() => {
   component.updatePass.controls['password'].setValue('Dinesh@123');
   component.updatePass.controls['rePassword'].setValue('Dinesh@123');
   expect(component.updatePass.valid).toBeTruthy();
 });

    it('updatePass invalid when empty', () => {
  expect(component.updatePass.valid).toBeFalsy();
});


it('submitting a updatePass emits a user', () => {
    expect(component.updatePass.valid).toBeFalsy();
   component.updatePass.controls['password'].setValue('Dinesh@123');
   component.updatePass.controls['rePassword'].setValue('Dinesh@123');
    expect(component.updatePass.valid).toBeTruthy();
});

     it('should call the checkIfMatchingPasswords method', async(() => {
   fixture.detectChanges();
   spyOn(component,'checkIfMatchingPasswords');
   expect(component.checkIfMatchingPasswords).toHaveBeenCalledTimes(0);
 }));

});
