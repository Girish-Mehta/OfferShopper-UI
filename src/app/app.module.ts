/* for translation*/
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/header/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SearchComponentComponent } from './components/home-page/search-component/search-component.component';
import { ProductsHeaderComponent } from './components/home-page/products-header/products-header.component';
import { ProductsListComponent } from './components/home-page/products-list/products-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { UserComponent } from './components/user/user.component';
import { VendorPageComponent } from './components/vendor-page/vendor-page.component';
import { CarrybagComponent } from './components/user/carrybag/carrybag.component';
import { WishlistComponent } from './components/user/wishlist/wishlist.component';
import { AddOfferComponent } from './components/user/add-offer/add-offer.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { LocationComponent } from './components/shared/header/location/location.component';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { OffersService } from './services/offers.service';
import { WishlistService } from './services/wishlist.service';
import { CarrybagService } from './services/carrybag.service';
import { AddOfferService } from './services/add-offer.service';
import { LoginRegisterFrontpageComponent } from './components/login-register/login-register-frontpage.component';
import { SearchService } from './services/search.service';
import { SubscriptionListComponent } from './components/user/subscription-list/subscription-list.component';
import { AuthorizationService } from './services/authorization.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePasswordService } from './services/update-password.service';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { VerifyEmailService } from './services/verify-email.service';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { SeachResultsComponent } from './components/shop-page/seach-results/seach-results.component';
import { SearchBarComponent } from './components/shop-page/search-bar/search-bar.component';
import { HelpComponent } from './components/help/help.component';
import { LocationService } from './services/location.service';
import { LoginService } from './services/login.service';
import { BeASellerComponent } from './components/user/be-a-seller/be-a-seller.component';
import { WheelComponent } from './components/wheel/wheel.component';

const appRoutes:Routes=[

  { path: '', redirectTo: '/homepage/Delhi', pathMatch: 'full' },
  { path: 'homepage/:id', component: HomePageComponent },
  { path:'user/:id',component:UserComponent },
  { path:'login',component:LoginRegisterFrontpageComponent },
  { path:'contact',component:ContactUsComponent },
  { path:'vendor-register',component:VendorRegisterComponent },
  { path:'product/:id',component: ProductPageComponent},
  { path:'forgot-password',component: ForgotPasswordComponent},
  { path:'product/:id/:offerId',component: ProductPageComponent},
 /* { path:'vendorInfo',component: VendorPageComponent},*/
  { path:'vendorInfo/:id',component: VendorPageComponent},
  { path:'token/:id',component: UpdatePasswordComponent},
  { path:'help/:id',component: HelpComponent},
  { path:'verifyToken/user/:id',component: VerifyEmailComponent},
  //{path:'',redirectTo:'/sidebar' ,pathMatch:'full'},
  //{path:'**',redirectTo:'/sidebar' ,pathMatch:'full'}
  { path:'search/:id1/:id2',component: ShopPageComponent},
  { path:'search',component: ShopPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    SearchComponentComponent,
    ProductsHeaderComponent,
    ProductsListComponent,
    ContactUsComponent,
    UserComponent,
    LocationComponent,
    CarrybagComponent,
    UserdetailsComponent,
    ProductPageComponent,
    WishlistComponent,
    LoginRegisterFrontpageComponent,
    SubscriptionListComponent,
    VendorPageComponent,
    AddOfferComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    VendorRegisterComponent,
    ShopPageComponent,
    SeachResultsComponent,
    SearchBarComponent,
    HelpComponent,
    BeASellerComponent,
    WheelComponent
  ],
  imports: [
    IonRangeSliderModule,
    NgxPaginationModule,
    BrowserModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBeSuJbAPirjvZ0mEDxd-g05P5_f6gkAlQ'
   })
  ],
  providers: [UserService, WishlistService, CarrybagService, SearchService, OffersService, AuthorizationService, VerifyEmailService,UpdatePasswordService, LocationService,  LoginService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { 
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}