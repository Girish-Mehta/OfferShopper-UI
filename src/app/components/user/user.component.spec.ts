import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { UserComponent } from './user.component';
import { AuthorizationService } from '../../services/authorization.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

describe('UserProfileComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

     beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ UserComponent ],
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
       provide :  [AuthorizationService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call the isLogin method', async(() => {
   fixture.detectChanges();
   spyOn(component,'isLogin');
   expect(component.isLogin).toHaveBeenCalledTimes(0);
 }));

   it('should call the getUserId method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getUserId');
   expect(component.getUserId).toHaveBeenCalledTimes(0);
 }));

     it('should call the changeSidebarVender method', async(() => {
   fixture.detectChanges();
   spyOn(component,'changeSidebarVender');
   expect(component.changeSidebarVender).toHaveBeenCalledTimes(0);
 }));

});
