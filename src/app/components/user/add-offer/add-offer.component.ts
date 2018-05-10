import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AddOfferService } from '../../../services/add-offer.service';
import { FormsModule} from '@angular/forms';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from '../../../services/message.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


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
	imageUrl: String;
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
	public offers=[];
	
	constructor(
		private addOfferService: AddOfferService,
		private authorizationService: AuthorizationService,
		private messageService: MessageService,
		private _vcr: ViewContainerRef,
		private http: Http
		) { }

	ngOnInit()
	{
		this.getUserId();
	}

	//Funtion will retrieve the userId from the token
	getUserId() {
		this.authorizationService.getUserId().subscribe((res) =>{
			this.userInfo = res.text().split(',');
			this.userId = this.userInfo[2];
			this.getOffers(this.userId);
		}, (error) =>{
		})
	}

	//Function will retrieve the offers using userId 
	getOffers(userId) {
		this.addOfferService.getOffersList(userId).subscribe((res) =>{
			this.offers = res;
		}
		, (error) =>{console.log("error");
	})
	}

	//Function will delete the offer uploaded by vendor
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

	//Function will reset the all the feilds of vendor
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

	//Function will update the offer uploaded by vendor
	updateOffer(offerId){
		let user=this.offers.find(ele=>ele.offerId===offerId);
		this.User=user;
		this.offerCategories=user.offerCategories;
		this.discount=user.discount;
		this.keywords=user.keywords;
		let date = user.offerValidity.split("T");
		let newDate = date[0].split("-");
		let formatDate = newDate[0]+"/"+newDate[1]+"/"+newDate[2];
		this.offerValidity=formatDate;
		this.offerDescription=user.offerDescription;
		this.offerTerms=user.offerTerms;
		this.offerTitle=user.offerTitle;
		this.originalPrice=user.originalPrice;
	}

	//Function will update the offer on vendor page
	submit(){
		let IsoDate = new Date(this.offerValidity).toISOString();
		this.obj={
			"offerId" :this.User.offerId,
			"userId"  :this.User.userId,
			"offerTitle" :this.offerTitle,
			"offerValidity" :IsoDate,
			"dateOfAnnouncement" :this.User.dateOfAnnouncement,
			"address" :this.User.address,
			"offerDescription" :this.offerDescription,
			"originalPrice" :this.originalPrice,
			"discount" :this.discount,
			"offerRating" :this.User.offerRating,
			"offerCategories" :this.offerCategories,
			"offerTerms" :this.offerTerms,
			"keywords" :this.keywords,
			"imageURL":this.imageUrl
		}
		this.addOfferService.putOffer(this.obj).subscribe((res) =>{
			this.getOffers(res.userId);
			this.reset();
		}, (error) =>{

		})


	}

	//Function will retrieve all the offers uploaded by the vendor
	getOffer() {
		this.addOfferService.getShopAddress(this.userId).subscribe((res) =>{
			
			this.shopAddress=res.shopAddress;
			this.addOffer();
			
			this.reset();
		}, (error) =>{
		})
	}

	fileChange(event) {
		let fileList: FileList = event.target.files;
		if(fileList.length > 0) {
			let file: File = fileList[0];
			let formData:FormData = new FormData();
			formData.append('file', file);
			this.addOfferService.addImage(formData).subscribe((res: any) =>{				
				this.imageUrl=res.text();
				this.messageService.showSuccessToast(this._vcr,"Image uploaded");
			}, (error) =>{
			})
        /*let headers = new Headers();
        this.http.post("http://10.151.60.204:8801/upload", formData)
            .map(res => res.json())
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
                )*/
            }
        }

	//Function will add new offers updated by the vendor
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
			"keywords" :this.keywords,
			"imageURL" :this.imageUrl
		}
		this.addOfferService.addNewOffer(this.obj).subscribe((res) =>{
			
			this.getOffers(res.userId);
			this.messageService.showSuccessToast(this._vcr,"Offer added");
		}, (error) =>{
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

	//Function will validate the coupon code entered by the vendor
	couponValidate()
	{
		this.addOfferService.couponValidateService(this.coupon,this.userId).subscribe((res) =>{
			let couponData = res;
			if(couponData==null) {
				this.messageService.showErrorToast(this._vcr,"Sorry,Wrong CouponId");
			}
			else if (couponData!=null&&couponData.vendorValidationFlag==true)
			{
				alert("already validated");
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
					//code not checked
					this.addOfferService.getUser(this.userId).subscribe((res) =>{
						let userData = res;
						if(userData==null) {
							alert("User not found");
						}
						else {
							if(userData.osCash != 0){
								var price = this.originalPrice-((this.discount*this.originalPrice)/100);
								if(price > userData.osCash){
									userData.osCash =0 ;
								}
								else{
									userData.osCash = userData.osCash-price;
								}
								this.addOfferService.updateOsCash(userData.osCash,userData.userId).subscribe((res) =>{
									this.messageService.showSuccessToast(this._vcr,"os cash updated");
								}, (error) =>{
									alert("OS cash could not be updated");
								})
							}
						}
					}
					, (error) =>{console.log("error");
				})
					//till here not checked
				}, (error) =>{
				})
			}
		}
		, (error) =>{
		})
	}
}




