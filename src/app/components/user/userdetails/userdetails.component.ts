import { Component, OnInit, ViewContainerRef,Inject } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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

  fb: FormBuilder;
  homeCities = [];
  shopCities = [];
  states= States.states;
  data:any;
  role:string;
  name:string;
  number:string;
  password:string;
  dob:string;
  gender:string;
  spinCount:number;
  offerIdList:Array<String>=[];
  osCash:number;
  shopNumber:string;
  vendorMobileNo:string;
  timestamp:number;
  form:FormGroup;
  obj={};
  status:string;
  public userInfo;
  public userId;

  firstName:String;
  lastName:String;
  phone:number;
  emailId:string;
  street:string;
  city:string;
  zip:number;
  state:string;
  shopName:string;
  shopStreet:string;
  shopCity:string;
  shopState:string;
  shopZip:number;
  toggle:boolean=true;
  sameAsAboveCity:boolean=false;
  defaultCity:boolean=false;

  constructor(@Inject(FormBuilder)  fb: FormBuilder,
    private userdata:UserService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private messageService: MessageService,
    private _vcr: ViewContainerRef
    ) { 

      this.status = 'none';
    this.fb=fb;
        this.form=this.fb.group({
      firstName:[{value: null,
        disabled: this.toggle
      }],
      lastName:[{value: null,
        disabled: this.toggle
      }],
      phone:[{value: null,
        disabled: this.toggle
      },[Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(11)]
      ],
      emailId:[{value: null,
        disabled: true
      },[Validators.email]],
      street:[{value: null,
        disabled: this.toggle
      }],
      city:[{value: null,
        disabled: this.toggle
      }],
      state:[{value: null,
        disabled: this.toggle
      }],
      zip:[{value: null,
        disabled: this.toggle
      }],
      shopName:[{value: null,
        disabled: this.toggle
      },[Validators.required]],
      shopStreet:[{value: null,
        disabled: this.toggle
      },[Validators.required]],
      shopCity:[{value: null,
        disabled: this.toggle
      },[Validators.required]],
      shopState:[{value: null,
        disabled: this.toggle
      },[Validators.required]],
      shopZip:[{value: null,
        disabled: this.toggle
      },[Validators.required, Validators.minLength(6),Validators.pattern('[0-9]*')]],
      sameAddress:[{value: null,
        disabled: this.toggle
      }]
    });
    
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

  intilizeForm() {
    if(this.toggle==false){
 this.form.controls['firstName'].enable();
 this.form.controls['lastName'].enable();
 this.form.controls['phone'].enable();
 this.form.controls['street'].enable();
 this.form.controls['city'].enable();
 this.form.controls['state'].enable();
 this.form.controls['zip'].enable();
 this.form.controls['shopName'].enable();
 this.form.controls['shopStreet'].enable();
  this.form.controls['shopCity'].enable();
 this.form.controls['shopState'].enable();
  this.form.controls['shopZip'].enable();
  this.form.controls['sameAddress'].enable();
}
    else{
  this.form.controls['firstName'].disable();
 this.form.controls['lastName'].disable();
 this.form.controls['phone'].disable();
 this.form.controls['street'].disable();
 this.form.controls['city'].disable();
 this.form.controls['state'].disable();
 this.form.controls['zip'].disable();
 this.form.controls['shopName'].disable();
 this.form.controls['shopStreet'].disable();
  this.form.controls['shopCity'].disable();
 this.form.controls['shopState'].disable();
  this.form.controls['shopZip'].disable();
  this.form.controls['sameAddress'].disable();
}

  }

  //Function will retrieve the user profile using userId
  getProfile(userId){
    this.userdata.getProfile(userId).subscribe((res) =>{
      console.log(res);
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

      this.form.patchValue({
        firstName:this.firstName,
        lastName:this.lastName,
        phone:this.phone,
        emailId:this.emailId,
        street:this.street,
        city:this.city,
        state:this.state,
        zip:this.zip,
        shopName:this.shopName,
        shopStreet:this.shopStreet,
        shopCity:this.shopCity,
        shopState:this.shopState,
        shopZip:this.shopZip
      });
console.log(res);
    },(error) =>{
    })
  }

  //Funtion will make form editable
  undisableTxt() {
    this.toggle=!this.toggle;
    this.intilizeForm();
    this.status = 'edit-mode';
    // (<HTMLInputElement>document.getElementById("firstName")).disabled= false;
    // (<HTMLInputElement>document.getElementById("lastName")).disabled = false;
    // (<HTMLInputElement>document.getElementById("phone")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputAddress")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputCity")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputZip")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputState")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputShopName")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputShopAddress")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputShopCity")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputShopZip")).disabled = false;
    // (<HTMLInputElement>document.getElementById("inputShopState")).disabled = false;
    // (<HTMLInputElement>document.getElementById("sameCheckbox")).disabled = false;
  };

  //Function will update the user details
  submit(){
    this.toggle=!this.toggle;
    this.intilizeForm();
    this.status = 'none';
    // (<HTMLInputElement>document.getElementById("firstName")).disabled= true;
    // (<HTMLInputElement>document.getElementById("lastName")).disabled = true;
    // (<HTMLInputElement>document.getElementById("phone")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputAddress")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputCity")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputZip")).disabled =true;
    // (<HTMLInputElement>document.getElementById("inputState")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputShopName")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputShopAddress")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputShopCity")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputShopZip")).disabled = true;
    // (<HTMLInputElement>document.getElementById("inputShopState")).disabled = true;
    // (<HTMLInputElement>document.getElementById("sameCheckbox")).disabled = true;
    let obj={
      "firstName": this.form.get('firstName').value,
      "lastName": this.form.get('lastName').value,
      "password": this.password,
      "role": this.role,
      "mobileNo":this.form.get('phone').value,
      "email": this.form.get('emailId').value,
      "dob": this.dob,
      "address": {
        "name": this.name,
        "number":this.number,
        "street": this.form.get('street').value,
        "city": this.form.get('city').value,
        "state":this.form.get('state').value,
        "zipCode":this.form.get('zip').value
      },
      "gender":this.gender,
      "spinCount":this.spinCount,
      "osCash": this.osCash,
      "shopAddress": {
        "name": this.form.get('shopName').value,
        "number":this.shopNumber,
        "street": this.form.get('shopStreet').value,
        "city": this.form.get('shopCity').value,
        "state": this.form.get('shopState').value,
        "zipCode": this.form.get('shopZip').value
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
  setAddress() {
    if( this.form.get('sameAddress').value==false){
      if(this.form.get('city').value=="" || this.form.get('state').value=="" ||  this.form.get('street').value=="" || this.form.get('zip').value==""){
        alert("Address not properly entered");
      }
      else{
        let city= this.form.get('city').value;
        let state= this.form.get('state').value;
        let street= this.form.get('street').value;
        let zipCode=this.form.get('zip').value;
        this.shopCities = this.homeCities;
        this.form.patchValue({
          shopStreet:  street,
          shopState:  state,
          shopCity: city,
          shopZip: zipCode,
        });
      }
    }
    else{
      this.form.patchValue({
          shopStreet:  "",
          shopState:  "",
          shopCity: "",
          shopZip: "",
        });
    }
  }

  //Function will show the relevant cities 
  showRelevantCitiesHome() {
    this.homeCities = StateCityJson.stateCityJson[this.form.get('state').value];
    // this.homeCities = StateCityJson.stateCityJson[state];
    this.city = "Please select a city";
  }

  showRelevantCitiesShop() {
    this.shopCities = StateCityJson.stateCityJson[this.form.get('shopState').value];
    this.shopCity = "Please select a city";
    console.log(this.shopCities);
  }

}
