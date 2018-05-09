import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../../../services/search.service';
import { ProductsListComponent } from './products-list.component';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ProductsListComponent ],
     imports: [
       BrowserModule,
       HttpClientModule,
       HttpModule,
       RouterTestingModule,
                  TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      })
     ],
     providers:[{
       provide :  [ ProductsListComponent] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('should create', () => {
    expect(component).toBeTruthy();
  });


});

