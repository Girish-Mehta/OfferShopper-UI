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
import { UserdetailsComponent } from './userdetails.component';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';

describe('UserdetailsComponent', () => {
  let component: UserdetailsComponent;
  let fixture: ComponentFixture<UserdetailsComponent>;
  let debug:DebugElement;
  let el:HTMLElement;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ UserdetailsComponent ],
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
       provide :  [AuthorizationService, MessageService,UserService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 //    it('should call the showRelevantCitiesShop method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'showRelevantCitiesShop');
 //   expect(component.showRelevantCitiesShop).toHaveBeenCalledTimes(0);
 // }));

 //     it('should call the showRelevantCitiesHome method', async(() => {
 //   spyOn(component,'showRelevantCitiesHome');
 //   el=fixture.debugElement.query(By.css('select')).nativeElement;
 //   el.click();
 //   expect(component.showRelevantCitiesHome).toHaveBeenCalledTimes(0);
 // }));

 //    it('should call the setCheckboxAddress method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'setCheckboxAddress');
 //   expect(component.setCheckboxAddress).toHaveBeenCalledTimes(0);
 // })); 

 //    it('should call the submit method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'submit');
 //   expect(component.submit).toHaveBeenCalledTimes(0);
 // }));

 //      it('should call the undisableTxt method', async(() => {
 //   fixture.detectChanges();
 //   spyOn(component,'undisableTxt');
 //   expect(component.undisableTxt).toHaveBeenCalledTimes(0);
 // }));



});
