import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsHeaderComponent } from './products-header.component';
import { OffersService } from '../../../services/offers.service';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ToastModule} from 'ng2-toastr/ng2-toastr';

describe('ProductsHeaderComponent', () => {
  let component: ProductsHeaderComponent;
  let fixture: ComponentFixture<ProductsHeaderComponent>;
  let service: OffersService;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ProductsHeaderComponent ],
     imports: [
       BrowserModule,
       HttpModule,
       HttpClientModule,
       RouterTestingModule,
           TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, 'public/assets/i18n', '.json'),
          deps: [Http]
      })
     ],
     providers:[{
       provide : [ OffersService]
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('should call the loadOffers method', async(() => {
   fixture.detectChanges();
   spyOn(component,'loadOffers');
   expect(component.loadOffers).toHaveBeenCalledTimes(0);
 }));

});
