import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthorizationService } from '../../../services/authorization.service';
import { MessageService } from './../../../services/message.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { States } from '../../../configs/state.config';
import { Cities } from '../../../configs/cities.config';
import { StateCityJson } from '../../../configs/state-city-json.config';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
  providers:[ AuthorizationService, MessageService ,UserService]
})
export class UserdetailsComponent implements OnInit {

  homeCities = [];
  shopCities = [];
  states= States.states;
  data:any;
  firstName:string;
  lastName:string;
  phone:string;
  emailId:string;
  role:string;
  name:string;
  number:string;
  street:string;
  city:string;
  zip:number;
  state:string;
  password:string;
  dob:string;
  gender:string;
  spinCount:number;
  offerIdList:Array<String>=[];
  osCash:number;
  shopName:string;
  shopNumber:string;
  shopStreet:string;
  shopCity:string;
  shopState:string;
  shopZip:number;
  vendorMobileNo:string;
  timestamp:number;
  obj={};
  status:string;
  public userInfo;
  public userId;

  constructor(private userdata:UserService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private messageService: MessageService,
    private _vcr: ViewContainerRef
    ) {
      this.status = 'none';
    }

  ngOnInit() {
    this.getUserId();
  }

  //Function will retrieve the userId from the token
  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      if(res.text() == "UnAuthorized"){
        this.router.navigate(['/login']);
      }
      this.userInfo = res.text().split(',');
      this.userId = this.userInfo[2];
      this.getProfile(this.userId);
    }, (error) =>{
    })
  }

  //Function will retrieve the user profile using userId
  getProfile(userId){
    this.userdata.getProfile(userId).subscribe((res) =>{
      this.obj=res;
      this.data = res;
      this.firstName=this.data.firstName;
      this.lastName=this.data.lastName;
      this.phone=this.data.mobileNo;
      this.emailId=this.data.email;
      this.role=this.data.role;
      this.name=this.data.address.name;
      this.number=this.data.address.number;
      this.street=this.data.address.street;
      this.city=this.data.address.city;
      this.zip=this.data.address.zipCode;
      this.state=this.data.address.state;
      this.password=this.data.password;
      this.dob=this.data.dob;
      this.gender=this.data.gender;
      this.spinCount=this.data.spinCount;
      this.osCash=this.data.osCash;
      this.shopName=this.data.shopAddress.name;
      this.shopNumber=this.data.shopAddress.number;
      this.shopStreet=this.data.shopAddress.street;
      this.shopCity=this.data.shopAddress.city;
      this.shopState=this.data.shopAddress.state;
      this.shopZip=this.data.shopAddress.zipCode;
      this.vendorMobileNo=this.data.vendorMobileNo;
      this.timestamp=this.data.timestamp;
      this.offerIdList=this.data.offerIdList;
      console.log(res);
    },(error) =>{
    })
  }

  //Funtion will make form editable
  undisableTxt() {
    this.status = 'edit-mode';
    (<HTMLInputElement>document.getElementById("firstName")).disabled= false;
    (<HTMLInputElement>document.getElementById("lastName")).disabled = false;
    (<HTMLInputElement>document.getElementById("phone")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputAddress")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputCity")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputZip")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputState")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputShopName")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputShopAddress")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputShopCity")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputShopZip")).disabled = false;
    (<HTMLInputElement>document.getElementById("inputShopState")).disabled = false;
    (<HTMLInputElement>document.getElementById("sameCheckbox")).disabled = false;
  };

  //Function will update the user details
  submit(){
    this.status = 'none';
    (<HTMLInputElement>document.getElementById("firstName")).disabled= true;
    (<HTMLInputElement>document.getElementById("lastName")).disabled = true;
    (<HTMLInputElement>document.getElementById("phone")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputAddress")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputCity")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputZip")).disabled =true;
    (<HTMLInputElement>document.getElementById("inputState")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopName")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopAddress")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopCity")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopZip")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopState")).disabled = true;
    (<HTMLInputElement>document.getElementById("sameCheckbox")).disabled = true;
    let obj={
      "firstName": this.firstName,
      "lastName": this.lastName,
      "password": this.password,
      "role": this.role,
      "mobileNo":this.phone,
      "email": this.emailId,
      "dob": this.dob,
      "address": {
        "name": this.name,
        "number":this.number,
        "street": this.street,
        "city": this.city,
        "state":this.state,
        "zipCode":this.zip
      },
      "gender":this.gender,
      "spinCount":this.spinCount,
      "osCash": this.osCash,
      "shopAddress": {
        "name": this.shopName,
        "number":this.shopNumber,
        "street": this.shopStreet,
        "city": this.shopCity,
        "state": this.shopState,
        "zipCode": this.shopZip
      },
      "vendorMobileNo":this.vendorMobileNo,
      "offerIdList":this.offerIdList,
      "timestamp": this.timestamp
    }
    this.userdata.putProfile(obj).subscribe((res) =>{
      this.messageService.showSuccessToast(this._vcr,"Updated");
    }, (error) =>{
    })
  }

  cancel(){
    this.status='none';
    this.getUserId();
    (<HTMLInputElement>document.getElementById("firstName")).disabled= true;
    (<HTMLInputElement>document.getElementById("lastName")).disabled = true;
    (<HTMLInputElement>document.getElementById("phone")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputAddress")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputCity")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputZip")).disabled =true;
    (<HTMLInputElement>document.getElementById("inputState")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopName")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopAddress")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopCity")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopZip")).disabled = true;
    (<HTMLInputElement>document.getElementById("inputShopState")).disabled = true;
  }

  //Function show the shop details of vendor
  setCheckboxAddress() {
    this.shopState = this.state;
    this.shopZip = this.zip;
    this.shopStreet = this.street;
    this.shopCity =  this.city;
  }

  //Function will show the relevant cities
  showRelevantCitiesHome(state) {
    this.homeCities = StateCityJson.stateCityJson[state];
    this.city = "Please select a city";
  }

  showRelevantCitiesShop(state) {
    this.shopCities = StateCityJson.stateCityJson[state];
    this.shopCity = "Please select a city";
  }

}
