import { Injectable, EventEmitter,ViewContainerRef } from '@angular/core';
import swal  from 'sweetalert2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class MessageService {
  public showLoader: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastsManager, 
    ) {
  }

  deleteConfirmation(callback=null) {
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=> {
      if(result.value){
        if(callback){        
          callback();
        }
      }
    }).catch(cancel=>{
    })
  }

/*
* confirmation alert
*/
confirmation(text:string,confirmButtonText:string,callback=null,title:string='Are you sure?') {
  text= text || '';
  confirmButtonText=confirmButtonText || 'Yes';
  swal({
    title: title,
    text: text,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText
  }).then(()=>{
    if(callback){
      callback();
    }
  })
}

/*
* to display error toast
*/
showErrorToast(_vcr:ViewContainerRef,message:string,title:string='Oops!') {
  this.toastr.setRootViewContainerRef(_vcr);
  this.toastr.error(message, title);
}

/*
* to display success toast
*/
showSuccessToast(_vcr:ViewContainerRef,message:string,title:string='Success!') {
  this.toastr.setRootViewContainerRef(_vcr);
  this.toastr.success(message, title);
}

showNoSpin() {
  swal({
    type: 'error',
    title: 'Oops...',
    text: "You have already used today's spin... Please come back tomorrow"
  })
}

showOsSpin(cash:number) {
  swal({
    animation: false,
    customClass: 'animated tada',
    type: 'success',
    title: cash +' Cash Added',
    showConfirmButton: true
  })
}

}