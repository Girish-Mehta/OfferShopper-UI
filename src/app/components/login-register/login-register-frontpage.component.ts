

import { Component, OnInit,Inject,ViewContainerRef } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {loginDetails} from './loginDetails';
import {registerDetails} from './registerDetails';
import {LoginService} from '../../services/login.service';
import {RegisterService} from '../../services/register.service';
import {vendorDetails} from './vendorDetails';
import { MessageService } from './../../services/message.service';
import {GooglesigninService} from '../../services/googlesignin.service'
import {HomeUrl} from '../../configs/homeRedirect.config';
declare const gapi: any;

@Component({
  selector: 'app-login-register-frontpage',
  templateUrl: './login-register-frontpage.component.html',
  styleUrls: ['./login-register-frontpage.component.css'],
  providers:[ RegisterService,MessageService,LoginService,GooglesigninService ]
})
export class LoginRegisterFrontpageComponent implements OnInit {
  public auth2: any;
  registerUsername:String;
  registerPassword:String;
  registerAddress:String;
  registerCity:String;
  registerState:String;
  registerZip:number;
  loginDetails:loginDetails;
  loginForm:FormGroup;
  addressProxy:FormGroup;
  registerForm:FormGroup;
  fb: FormBuilder;
  vendorDetails:vendorDetails;
  form:FormGroup;
  tempPassword:String;
  isAlredyExist:boolean=false;
  status: boolean = false;
  private userLocation: string = "Delhi";
  windowRef:any=window;

  constructor(
    @Inject(FormBuilder)  fb: FormBuilder,
    private loginService:LoginService,
    private registerService:RegisterService,
    private router:Router,
    private messageService:MessageService,
    private _vcr:ViewContainerRef,
    private googlesigninservice:GooglesigninService

    ) {
    this.fb=fb;
    this.registerForm=this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      rePassword: ['',[Validators.required]]
    },{validator: this.checkIfMatchingPasswords});
    this.onChanges();
  }

  
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '365945332378-avlqvr9k9k1m1gkko3uocqaa5s5cj4pm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
          this.googlesigninservice.getgooglesign(id_token).subscribe(res=>{
          res=res.toString();
          localStorage.setItem("application-token",res);
          let userLocation = localStorage.getItem("loc");
          let redirectUrl=HomeUrl.homeUrl+userLocation;
          window.location.href = redirectUrl;
        },error=>{
          console.log("error in services")
        }
        )
        


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }




  ngOnInit() {
    this.loginForm=new FormGroup({
      username : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
    this.userLocation = localStorage.getItem("loc");
  }

  onChanges(): void {
    this.registerForm.get('username').valueChanges.subscribe(val => {
      this.isAlredyExist=false;
    });
  }

  login(){
    let username=this.loginForm.get('username').value;
    let  password = this.loginForm.get('password').value;
    var xorKey = 129;
    var result = "";

    for (let i = 0; i < password.length; i++) {
      result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
    }

    this.loginService.loginWithEmailId(username,result).subscribe((res) =>{

      this.router.navigate(['/homepage']);
      this.router.navigate(['/homepage',this.userLocation]);

    }, (res:Response) =>{
      if(res.status==401){
        alert("Unauthorized User");
      }
      else if(res.status==500){
        alert("Internal server error");
      }
      else if(res.status==201){
        alert("Successfully logged in");
      }
      else if(res.status==404){
        alert("Service Not Found");
      }
      else if(res.status==403){
        alert("403 Forbidden");
      }
      else{
        alert("Connection error");
      }
    });
  }

//password match validator
checkIfMatchingPasswords(group: FormGroup) {
  let passwordField= group.controls.password,
  confirmPasswordField = group.controls.rePassword;
  if(passwordField.value !== confirmPasswordField.value ) {
    return confirmPasswordField.setErrors({notEquivalent: true})
  }else {
    return confirmPasswordField.setErrors(null);
  }
}

registerUser(){
  let tempPassword="";

  tempPassword=this.registerForm.get('password').value;
  var xorKey = 129;
  var resultPassword = "";

  for (let i = 0; i < tempPassword.length; i++) {
    resultPassword += String.fromCharCode(xorKey ^ tempPassword.charCodeAt(i));
  }

  let body={
    "email": this.registerForm.get('username').value,
    "password":  resultPassword,
    "role":      "Customer"
  };

  this.registerService.register(body).subscribe((res) =>{
    this.messageService.showSuccessToast(this._vcr,"Verfification link sent your Email Id");
    this.registerForm.reset();
  }, (res:Response) =>{
    if(res.status==401 || res.status==409){
      this.messageService.showErrorToast(this._vcr,"Username already exists");
    }
    else if(res.status==500){
      alert("Internal server error");
    }
    else if(res.status==201){
      this.messageService.showSuccessToast(this._vcr,"Successfully Registered");
    }
    else if(res.status==404){
      alert("Service Not Found");
    }
    else if(res.status==403){
      alert("403 Forbidden");
    }
    else{
      alert("Connection error");

    }
  });

}

}

// ^                 # start-of-string
// (?=.*[0-9])       # a digit must occur at least once
// (?=.*[a-z])       # a lower case letter must occur at least once
// (?=.*[A-Z])       # an upper case letter must occur at least once
// (?=.*[@#$%^&+=])  # a special character must occur at least once
// (?=\S+$)          # no whitespace allowed in the entire string
// .{8,}             # anything, at least eight places though
// $                 # end-of-string
