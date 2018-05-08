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
       provide :  [ SearchService, UserService ] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPageComponent);
    component = fixture.componentInstance;
     debug=fixture.debugElement.query(By.css('form'));
   el=debug.nativeElement;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 //    it('should call the loadOffers method',() => {
 //   spyOn(component,'loadOffers');
 //   el=fixture.debugElement.query(By.css('button')).nativeElement;
 //   el.click();
 //   expect(component.loadOffers).toHaveBeenCalledTimes(0);
 // })

});
