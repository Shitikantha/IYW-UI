import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  html = "<br /><br /><button type='button' class='btn clear'>Yes</button>";

  constructor(private toastr: ToastrService) { }

  showSuccessToast(modalSetting:any){
    return this.toastr.success(modalSetting.msg,'',{
      progressBar:true,
      positionClass:"toast-top-center",
      timeOut: 1000,
    });
  }
  showErrorToast(modalSetting:any){
    return this.toastr.error(modalSetting.msg,'',{
      progressBar:true,
      positionClass:"toast-top-center",
      timeOut: 1000,
    });
  }

  // showConfirmMsg(){
  //   // return this.toastr.success(``,'Are You Sure?',
  //   // {
  //   //   enableHtml: true,
  //   //   tapToDismiss: false,
  //   //   disableTimeOut:false,
  //   //   // onShown:()=>{
        
  //   //   // }
    
  //   // });
  //   return this.toastr.show('Do You Want To Start the test ?','Are You Sure ?',{
  //     disableTimeOut:true,
  //     messageClass:'toast-success',
  //     // toastClass:'toast-success'
  //   });
  // }
}
