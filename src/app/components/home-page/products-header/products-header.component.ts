import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { OffersService } from '../../../services/offers.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../../services/message.service';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
  providers: [OffersService,MessageService]
})

export class ProductsHeaderComponent implements OnInit {

  public offers : any;
  public priceAfterDiscount: any;
  private userLocation: string;
  private osCash;

  constructor(
    private offersService : OffersService,
    private route: ActivatedRoute,
    private messageService:MessageService,
    private _vcr:ViewContainerRef
    ) { }

  ngOnInit() {
    this.osCash = localStorage.getItem("os-cash");
    this.route.paramMap.subscribe(params => {
      this.userLocation = params.get('id');
      this.loadOffers();
    });
  }

  //Function calculates the discounted price
  productPrice(offerOriginalPrice,offerDiscount){
    this.priceAfterDiscount = Number((offerOriginalPrice)*(1-(offerDiscount)/100)).toFixed(2);
  }

  //Function loads offers according to location
  loadOffers(){
    this.offersService.getOffersByLocation(this.userLocation)
    .subscribe((res) =>{
      this.offers=res;
    },(error) =>{
      //this.messageService.showErrorToast(this._vcr,"Something went wrong ,Please try again");
    });
  }
}
