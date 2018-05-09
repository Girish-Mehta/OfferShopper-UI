import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationService } from '../../../../services/location.service';
import { TranslateService } from '@ngx-translate/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement,ViewContainerRef } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { LocationComponent } from './location.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
//import { TranslateStore } from "@ngx-translate/core/src/translate.store";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
xdescribe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let debug: DebugElement;
  let el: HTMLElement;

      beforeEach(async(() => {
     TestBed.configureTestingModule({
     declarations: [ LocationComponent ],
     imports: [
       BrowserModule,
       HttpClientModule,
       HttpModule,
       RouterTestingModule,
       FormsModule,
       ToastModule.forRoot(),
       ReactiveFormsModule,
          /*TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      })*/
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })],
     providers:[
       LocationService, //,TranslateStore 
       ]
   })
   .compileComponents();
 }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
