import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { UpdatePasswordService } from '../../services/update-password.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  providers:[ UpdatePasswordService, MessageService]
})
export class UpdatePasswordComponent implements OnInit {

	token;

  up: FormBuilder;
  updatePass:FormGroup;
  private userLocation: string;
  constructor(@Inject(FormBuilder)  up: FormBuilder,
  	private updatePasswordService:UpdatePasswordService,
  	private route: ActivatedRoute,
    private messageService: MessageService,
    private _vcr: ViewContainerRef,
    private router:Router
    ) {
    this.up=up; 
    this.updatePass=this.up.group({
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      rePassword: ['',[Validators.required]]
    },{validator: this.checkIfMatchingPasswords});
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

  ngOnInit() {
  	this.token=this.route.snapshot.params.id;
    this.userLocation = localStorage.getItem("loc");
  }

  updatePassword(){
    let password=this.updatePass.get('password').value;
    var xorKey = 129;
    var result = "";

    for (let i = 0; i < password.length; i++) {
      result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
    }
    let body={
      "jwe": this.token,
      "password": result
    };
    this.updatePasswordService.updatePassWithEmail(body).subscribe((res) =>{
      this.messageService.showSuccessToast(this._vcr,"Updated");
       this.router.navigate(['/homepage',this.userLocation]);
    }, (res:Response) =>{
      if(res.status==401 || res.status==409){
        this.messageService.showErrorToast(this._vcr,"Username already exists");
      }
      else if(res.status==500){
        this.messageService.showErrorToast(this._vcr,"Internal server error");
      }
      else if(res.status==404){
        this.messageService.showErrorToast(this._vcr,"Service Not Found");
      }
      else if(res.status==403){
        this.messageService.showErrorToast(this._vcr,"403 Forbidden");
      }
      else{
        this.messageService.showErrorToast(this._vcr,"Connection error");
      }
    });

  }

}
