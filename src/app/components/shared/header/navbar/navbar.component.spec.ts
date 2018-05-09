import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LoginService } from '../../../../services/login.service';
import { AuthorizationService } from '../../../../services/authorization.service';
import { TranslateService } from '@ngx-translate/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ NavbarComponent ],
     schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
     imports: [
       BrowserModule,
       HttpClientModule,
       HttpModule,
       RouterTestingModule,
       ToastModule.forRoot(),
          TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      }),

     ],
      providers: [AuthorizationService                                                                    
    ]                                                                        
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
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

        it('should call the logout method', async(() => {
   fixture.detectChanges();
   spyOn(component,'logout');
   expect(component.logout).toHaveBeenCalledTimes(0);
 }));

         it('should call the getUserId method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getUserId');
   expect(component.getUserId).toHaveBeenCalledTimes(0);
 }));

        it('should call the loadUserprofile method', async(() => {
   fixture.detectChanges();
   spyOn(component,'loadUserprofile');
   expect(component.loadUserprofile).toHaveBeenCalledTimes(0);
 }));

});
