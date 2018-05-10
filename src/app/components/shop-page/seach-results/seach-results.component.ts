import { Component, OnInit, Input,ViewContainerRef  } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from '../../../services/message.service';
import { WishlistService } from '../../../services/wishlist.service';
import { OffersService } from '../../../services/offers.service';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
	selector: 'app-seach-results',
	templateUrl: './seach-results.component.html',
	styleUrls: ['./seach-results.component.css'],
	providers:[AuthorizationService,MessageService,WishlistService]
})
export class SeachResultsComponent implements OnInit {
	public userInfo : any;
	public user : any;
	private priceAfterDiscount;

	@Input() results = [];

	constructor(private wishlistService:WishlistService,
		private authorizationService: AuthorizationService,
		private messageService:MessageService,
		private _vcr:ViewContainerRef,
		private offersService: OffersService ) { }

	ngOnInit() {
		this.getUserId();
	}

	getUserId() {
		this.authorizationService.getUserId().subscribe((res) =>{
			this.userInfo = res.text().split(',');
			this.user = this.userInfo[2];
		}, (error) =>{
		})
	}

	//Function will calculate the discounted price
	productPrice(offerOriginalPrice,offerDiscount){
		this.priceAfterDiscount = Number((offerOriginalPrice)*(1-(offerDiscount)/100)).toFixed(2);
	}

	//Function will add offer to wishlist
	addToWishlist(offer1) {
		let wishlistBean = {
			"userId":this.user,
			"offerId":offer1.offerId,
			"offerTitle":offer1.offerTitle,
			"offerOriginalPrice":offer1.originalPrice,
			"offerDiscount":offer1.discount,
			"offerImage":"abcd",
			"offerValidity":offer1.offerValidity
		}
		this.wishlistService.addToWishlist(wishlistBean).subscribe((res) =>{
			this.messageService.showSuccessToast(this._vcr,"Added in Wishlist");
		},(res:Response) =>{
			if(res.status==409){
				this.messageService.showErrorToast(this._vcr,"Already in Wishlist");
			}
			else if(res.status==400){
				this.messageService.showErrorToast(this._vcr,"Already in Wishlist");
			}
		})
	}

	//Function will add offer to carrybag
	addToCarrybag(offer) {
		let carrybagBean = {
			"userId":this.user,
			"offerId":offer.offerId,
			"offerTitle":offer.offerTitle,
			"offerOriginalPrice":offer.originalPrice,
			"offerDiscount":offer.discount,
			"offerImage":"abcd",
			"offerValidity":offer.offerValidity,
			"vendorId":offer.userId
		}
		this.offersService.addToCarrybag(carrybagBean).subscribe((res) =>{
			this.messageService.showSuccessToast(this._vcr,"Added to CarryBag");
		},(res:Response) =>{
			if(res.status==409){
				this.messageService.showErrorToast(this._vcr,"Already in CarryBag");
			}
			else if(res.status==400){
				this.messageService.showErrorToast(this._vcr,"Already in CarryBag");
			}
		})
	}

	//Function will check user is logged in or not
	notLogin(){
		this.messageService.showErrorToast(this._vcr,"Please Login");
	}

}
