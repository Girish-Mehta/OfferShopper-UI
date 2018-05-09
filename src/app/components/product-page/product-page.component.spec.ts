import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import { ProductPageComponent } from './product-page.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ProductDetailService } from './../../services/product-detail.service';
import { WishlistService } from './../../services/wishlist.service';
import { CarrybagService } from './../../services/carrybag.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let debug: DebugElement;
  let el: HTMLElement;

     beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ProductPageComponent ],
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
      })
     ],
     providers:[{
       provide :  [ProductDetailService,WishlistService,CarrybagService,AuthorizationService,MessageService] 
     }]
   })
   .compileComponents();
 }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
   fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 //    it('should call the searchProduct method',() => {
 //   spyOn(component,'searchProduct');
 //   el=fixture.debugElement.query(By.css('button')).nativeElement;
 //   el.click();
 //   expect(component.searchProduct).toHaveBeenCalledTimes(0);
 // })

});
