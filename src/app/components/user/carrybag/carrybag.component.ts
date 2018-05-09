import { Component, OnInit,ViewChild, ContentChild, ViewContainerRef } from '@angular/core';
import { CarrybagService } from '../../../services/carrybag.service';
import { AuthorizationService } from '../../../services/authorization.service';
import { MockNgModuleResolver } from '@angular/compiler/testing';
import { MessageService } from './../../../services/message.service';

@Component({
  selector: 'app-carrybag',
  templateUrl: './carrybag.component.html',
  styleUrls: ['./carrybag.component.css'],
  providers:[ CarrybagService, AuthorizationService, MessageService ]

})
export class CarrybagComponent implements OnInit {
  @ViewChild('myModal')myModal;
  @ViewChild('coupModal')coupModal;
  public carryBagOffers=[];
  obj={};
  couponId:any;
  currentUserId:String;
  currentOfferId:String;
  offerId:String;
  rating:number;
  feedback:String;
  data:any;
  flag:boolean;
  nothing:number;
  priceAfterDiscount: any;
  public userInfo;
  public userId;
  
  constructor(
    private carrybagService: CarrybagService,
    private authorizationService: AuthorizationService,
    private messageService: MessageService,
    private _vcr: ViewContainerRef
    ) { }


  ngOnInit()
  {
  	this.getUserId();
  }

  //Function will give the logged in userId 
  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      this.userInfo = res.text().split(',');
      this.userId = this.userInfo[2];
      this.getCarrybag();
    }, (error) =>{
    })
  }

  //Function will give the discounted price
  productPrice(offerOriginalPrice,offerDiscount){
  	this.priceAfterDiscount = (offerOriginalPrice)*(1-(offerDiscount)/100);
  }

  //Function will add offer in carrybag
  getCarrybag() {
    this.carrybagService.getCarrybaglist(this.userId).subscribe((res) =>{
      this.carryBagOffers = res;
    }, (error) =>{
    })
  }

  //Function will delete offer from carrybag
  deleteOffer(userId, offerId){
    this.carrybagService.deleteCarrybag(offerId,userId).subscribe((res) =>{
      this.getCarrybag();
    }, (error) =>{
    })
  }

  //Function will generate the coupon
  couponGenerate(userId,offerId,vendorId){
    this.carrybagService.checkCouponExistence(userId,offerId).subscribe((res) =>{
      let data=res;
      if(data.userId==null&&userId==vendorId) {
      }
      else if (data.userId==null&&userId!=vendorId) {
        this.obj={
          "userId"  :userId,
          "offerId" :offerId,
          "vendorId" :vendorId,
          "vendorValidationFlag" : false,
          "rating" :0.0,
          "feedback" :null,
          "inCarrybag" : true
        } 
        this.carrybagService.newCouponGenerate(this.obj).subscribe((res) =>{
          this.couponId=res.couponId;
          this.coupModal.nativeElement.click();
        }, (error) =>{
        })
      }
      else {
        this.couponId=data.couponId;
        this.coupModal.nativeElement.click();
      }
    }, (error) =>{
    })
  }

  //Function will add feedback of the vendor
  addfeedback() {
    this.carrybagService.checkCouponExistence(this.currentUserId,this.currentOfferId).subscribe((res) =>{
      let data=res;
      if(data.feedback==null){
        let user=this.carryBagOffers.find(ele=>ele.offerId===this.currentOfferId);
        this.obj={
          "couponId" :data.couponId ,
          "userId"  :data.userId,
          "vendorId" :data.vendorId,
          "offerId" :data.offerId,
          "vendorValidationFlag" : data.vendorValidationFlag,
          "rating" :this.rating,
          "feedback" :this.feedback
        } 
        this.carrybagService.updateFeedback(this.obj).subscribe((res) =>{
        }, (error) =>{
        })
        this.rating=undefined;
        this.feedback=undefined;
      }
      else {
        alert("feedback already done");
      }
    }, (error) =>{
    })
  } 

  //Function will check the feedback already exists or not
  checkFeedbackExistence(offerId, userId) {
    this.currentOfferId=offerId;
    this.currentUserId=userId;
    this.carrybagService.checkCouponExistence(userId,offerId).subscribe((res) =>{
      let data=res;
      if(data.feedback==null&&data.vendorValidationFlag==true){
        this.myModal.nativeElement.click();
      } else if (data.feedback==null&&data.vendorValidationFlag==false)  {
        alert("please verify your coupon through vendor");
      }
      else  {
        this.flag=false;
        alert("feedback already exists");
      }
    }, (error) =>{console.log("error");
  })
  } 
}
