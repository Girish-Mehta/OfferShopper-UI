import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { HeaderComponent } from './header.component';
import { APP_BASE_HREF } from '@angular/common';
import { LocationService } from "../../../services/location.service";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ HeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
     imports: [
       BrowserModule,
       HttpClientModule,
       FormsModule,
       HttpModule,
       RouterTestingModule,
       ToastModule.forRoot(),
          TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      }),

     ],
      providers: [
        { provide:  APP_BASE_HREF, useValue : '/' } ,
        { provide:  LocationService }                                                                      
    ]                                                                        
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call the fav favouriteCity', async(() => {
   fixture.detectChanges();
   spyOn(component,'favouriteCity');
   expect(component.favouriteCity).toHaveBeenCalledTimes(0);
 }));

    it('should call the setCity method', async(() => {
   fixture.detectChanges();
   spyOn(component,'setCity');
   expect(component.setCity).toHaveBeenCalledTimes(0);
 }));

     it('should call the getLocation method', async(() => {
   fixture.detectChanges();
   spyOn(component,'getLocation');
   expect(component.getLocation).toHaveBeenCalledTimes(0);
 }));

});


