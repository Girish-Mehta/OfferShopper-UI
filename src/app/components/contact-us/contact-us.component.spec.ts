import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { ContactUsComponent } from './contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import { HttpModule,Http } from '@angular/http';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

       beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ContactUsComponent ],
     imports: [
       BrowserModule,
       FormsModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      })
     ]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
