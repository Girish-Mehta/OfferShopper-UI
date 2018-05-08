import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from '../../../services/message.service';
import { CarrybagService } from '../../../services/carrybag.service';
import { SearchService } from '../../../services/search.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import { SearchComponentComponent } from './search-component.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

describe('SearchComponentComponent', () => {
  let component: SearchComponentComponent;
  let fixture: ComponentFixture<SearchComponentComponent>;
  let debug: DebugElement;
  let el: HTMLElement;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ SearchComponentComponent ],
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
     providers:[SearchService,
     MessageService,
     AuthorizationService,
     CarrybagService
     ]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponentComponent);
    component = fixture.componentInstance;
    debug=fixture.debugElement.query(By.css('form'));
   el=debug.nativeElement;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call the getUserId method',() => {
   spyOn(component,'getUserId');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.getUserId).toHaveBeenCalledTimes(0);
 })

    it('should call the redirectToSearch method',() => {
   spyOn(component,'redirectToSearch');
   el=fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.redirectToSearch).toHaveBeenCalledTimes(1);
 })

});
