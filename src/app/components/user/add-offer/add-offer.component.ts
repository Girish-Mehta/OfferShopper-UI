import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AddOfferService } from '../../../services/add-offer.service';
import { FormsModule} from '@angular/forms';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from '../../../services/message.service';

@Component({
	selector: 'app-add-offer',
	templateUrl: './add-offer.component.html',
	styleUrls: ['./add-offer.component.css'],
	providers:[ AddOfferService, AuthorizationService, MessageService ]
})

export class AddOfferComponent implements OnInit {
	offerId:String ;
	userId: String ;
	dateOfAnnouncement:any;
	offerCategories:String="Select Category";
	offerValidity:any;
	discount:any;
	keywords:String;
	offerDescription:String;
	offerTerms:String;
	offerTitle:String;
	originalPrice:any;
	city:String;
	state:String;
	street:String;
	zipCode:any;
	name:String;
	number:String;
	offerRating:any;
	coupon:number;
	public userInfo;
	shopAddress:any;

	obj={};
	toRedis={};
	toSoundex={};
	User:any={};

	date = new Date();

	constructor(private addOfferService: AddOfferService,
		private authorizationService: AuthorizationService,
		private messageService: MessageService,
		private _vcr: ViewContainerRef
		) { }

	ngOnInit()
	{
		this.getUserId();
	}


	getUserId() {
		this.authorizationService.getUserId().subscribe((res) =>{
			this.userInfo = res.text().split(',');
			this.userId = this.userInfo[2];
			this.getOffers(this.userId);
		}, (error) =>{
		})
	}

	public offers=[];

	getOffers(userId) {

		this.addOfferService.getOffersList(userId).subscribe((res) =>{

			this.offers = res;
		}
		, (error) =>{console.log("error");
	})
	}

	deleteOffer(offerId) {
		this.messageService.deleteConfirmation(()=>
			this.addOfferService.deleteOffer(offerId).subscribe((res) =>{
				this.messageService.showSuccessToast(this._vcr,"Deleted");
				this.getOffers(this.userId);
			}, (error) =>{
				alert(error + "deleting restaurant does not works");
			})
			);
		
	}

	reset(){
		this.offerId="";
		this.userId="";
		this.offerTitle="";
		this.offerValidity="";
		this.dateOfAnnouncement="";
		this.offerDescription="";
		this.originalPrice="";
		this.discount="";
		this.offerRating=0.0;
		this.offerCategories="";
		this.offerTerms="";
		this.keywords="";
		this.city="";
		this.state="";
		this.street="";
	}

	updateOffer(offerId){
		let user=this.offers.find(ele=>ele.offerId===offerId);
		this.User=user;
		this.offerCategories=user.offerCategories;
		this.discount=user.discount;
		this.keywords=user.keywords;
		this.offerValidity=user.offerValidity;
		this.offerDescription=user.offerDescription;
		this.offerTerms=user.offerTerms;
		this.offerTitle=user.offerTitle;
		this.originalPrice=user.originalPrice;
	}

	submit(){
		this.obj={
			"offerId" :this.User.offerId,
			"userId"  :this.User.userId,
			"offerTitle" :this.offerTitle,
			"offerValidity" :this.offerValidity,
			"dateOfAnnouncement" :this.User.dateOfAnnouncement,
			"address" :this.User.address,
			"offerDescription" :this.offerDescription,
			"originalPrice" :this.originalPrice,
			"discount" :this.discount,
			"offerRating" :this.User.offerRating,
			"offerCategories" :this.offerCategories,
			"offerTerms" :this.offerTerms,
			"keywords" :this.keywords,
			"imageURL":"image_url"
		}
		this.addOfferService.putOffer(this.obj).subscribe((res) =>{
			this.getOffers(this.userId);
			this.reset();
		}, (error) =>{

		})

	}

	getOffer() {
		this.addOfferService.getShopAddress(this.userId).subscribe((res) =>{
			this.shopAddress=res.shopAddress;
			debugger
			alert(this.shopAddress);
			this.addOffer();
		}, (error) =>{
			console.log(error);
		})

	}

	addOffer(){
		this.date = new Date();
		let minutes = "";
		let hours = "";
		let seconds = "";
		let day = "";
		let month = "";
		let year = "";

		if(this.date.getMinutes() < 10){
			minutes = "0"+this.date.getMinutes().toString();
		} else{
			minutes = this.date.getMinutes().toString();
		}
		if(this.date.getHours() < 10){
			hours = "0"+this.date.getHours().toString();
		} else{
			hours = this.date.getHours().toString();
		}
		if(this.date.getSeconds() < 10){
			seconds = "0"+this.date.getSeconds().toString();
		} else{
			seconds = this.date.getSeconds().toString();
		}

		if(this.date.getDate() < 10) {
			day = "0"+this.date.getDate().toString();
		} else {
			day = this.date.getDate().toString();
		}
		if(this.date.getMonth() < 10) {
			month = "0"+this.date.getMonth().toString();
		} else {
			month = this.date.getMonth().toString();
		}
		year = this.date.getFullYear().toString();

		let time = "T"+hours+":"+minutes+":"+seconds;
		let datetime = year+"-"+month+"-"+day+time;
		
		this.obj={
			"userId"  :this.userId,
			"offerTitle" :this.offerTitle,
			"offerValidity" :this.offerValidity+time,
			"dateOfAnnouncement" :datetime,
			"address" :this.shopAddress,
			"offerDescription" :this.offerDescription,
			"originalPrice" :this.originalPrice,
			"discount" :this.discount,
			"offerRating" :0.0,
			"offerCategories" :this.offerCategories,
			"offerTerms" :this.offerTerms,
			"keywords" :this.keywords
		}

		this.addOfferService.addNewOffer(this.obj).subscribe((res) =>{
			this.getOffers(this.userId);
			this.messageService.showSuccessToast(this._vcr,"Offer added");
		}, (error) =>{
			console.log("Error:");
			console.log(error);
		})

		this.toRedis={
			"keywords":this.keywords
		}
		this.addOfferService.addToRedis(this.toRedis).subscribe((res) =>{ }, (error) =>{
		})

		this.toSoundex={
			"offerTitle" : this.offerTitle,
			"offerCategories" : this.offerCategories,
			"keywords" : this.keywords
		}
				
			this.addOfferService.addToSoundex(this.toSoundex).subscribe((res) =>{
			}, (error) =>{
				alert("not added to soundex");
			})

	}

	couponValidate()
	{

		this.addOfferService.couponValidateService(this.coupon,this.userId).subscribe((res) =>{

			let couponData = res;

			if(couponData==null) {
				alert("wrong coupon entered");
			}
			else {
				let obj = {
					"couponId" : couponData.couponId,
					"userId" : couponData.userId,
					"offerId" : couponData.offerId,
					"vendorId" : couponData.vendorId,
					"rating" : couponData.rating,
					"vendorValidationFlag" : true
				}
				this.addOfferService.changeFlag(obj).subscribe((res) =>{
					this.messageService.showSuccessToast(this._vcr,"coupon verified");
				}, (error) =>{
				})
			}
		}
		, (error) =>{console.log("error");
	})
	}
}
