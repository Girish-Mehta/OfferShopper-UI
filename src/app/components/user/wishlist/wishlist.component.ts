import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from './../../../services/message.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers:[WishlistService, AuthorizationService, MessageService]
})
export class WishlistComponent implements OnInit {


  private priceAfterDiscount: any;
  private wishlistOffers=[];
  private userId: string;

  constructor(
    private wishlistService: WishlistService,
    private authorizationService: AuthorizationService,
    private messageService: MessageService,
    private _vcr: ViewContainerRef
    ) { }

  

  ngOnInit() {
    this.getUserId();
  }

  //method to calculate offer price after discount
  productPrice(offerOriginalPrice,offerDiscount){
  	this.priceAfterDiscount = Number((offerOriginalPrice)*(1-(offerDiscount)/100)).toFixed(2);
  }

  //method to get user's ID from authorization service
  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      this.userId = (res.text().split(','))[2];
      this.getWishlist();
    }, (error) =>{
      this.messageService.showErrorToast(this._vcr,error);
    })
  }

  //method to get array of wishlist offers from wishlist service
  getWishlist() {
    this.wishlistService.getWishlist(this.userId).subscribe((res) =>{
      this.wishlistOffers = res;
      console.log(this.wishlistOffers);
    }, (error) =>{
      this.messageService.showErrorToast(this._vcr,"Please try after sometime");
    })
  }

  //method to delete offer from wishlist
  deleteOffer(offerId,userId){
    //calling message service to confirm if user wants to delete offer
    this.messageService.deleteConfirmation(()=>
      this.wishlistService.deleteRestaurant(offerId,userId).subscribe((res) =>{
        this.messageService.showSuccessToast(this._vcr,"Deleted");
        this.getWishlist();
      }, (error) =>{
        this.messageService.showErrorToast(this._vcr,"Please try again");
      }));
  }

}
