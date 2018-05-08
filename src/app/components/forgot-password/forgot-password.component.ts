import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [ ForgotPasswordService, MessageService ]
})
export class ForgotPasswordComponent implements OnInit {



  registerForm:FormGroup;
  fb: FormBuilder;
  constructor(@Inject(FormBuilder)  fb: FormBuilder,
  	private forgotPasswordService:ForgotPasswordService,
    private messageService: MessageService,
    private _vcr: ViewContainerRef
    ) { 
    this.fb=fb;
    this.registerForm=this.fb.group({
      username: ['',[Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

  forgot(){
    let username=this.registerForm.get('username').value;	
    this.forgotPasswordService.forgotPasswordWithEmail(username).subscribe((res) =>{
      this.messageService.showSuccessToast(this._vcr,"Link sent to mail");
    }, (res:Response) =>{
      if(res.status==204){
        this.messageService.showErrorToast(this._vcr,"User not registered");
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
