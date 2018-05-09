import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../../services/offers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
  providers: [OffersService]
})
export class ProductsHeaderComponent implements OnInit {

  public offers : any;
  public priceAfterDiscount: any;
  private userLocation: string;

  constructor(
    private offersService : OffersService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userLocation = params.get('id');
      this.loadOffers();
    });
  }

  productPrice(offerOriginalPrice,offerDiscount){
    this.priceAfterDiscount = Number((offerOriginalPrice)*(1-(offerDiscount)/100)).toFixed(2);
  }

  //loads offers according to location.. currently location is hardcoded
  loadOffers(){
    this.offersService.getOffersByLocation(this.userLocation)
    .subscribe((res) =>{
      this.offers=res;
     },(error) =>{
       this.offers=null;
    });
  }
}
