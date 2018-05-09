import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { SeachResultsComponent } from './seach-results.component';

import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from '../../../services/message.service';
import { WishlistService } from '../../../services/wishlist.service';
import { OffersService } from '../../../services/offers.service';

describe('SeachResultsComponent', () => {
  let component: SeachResultsComponent;
  let fixture: ComponentFixture<SeachResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeachResultsComponent ]
    })
    .compileComponents();
  }));

     beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ SeachResultsComponent ],
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
       provide :  [AuthorizationService,MessageService,WishlistService,OffersService] 
     }]
   })
   .compileComponents();
 }));


  beforeEach(() => {
    fixture = TestBed.createComponent(SeachResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
