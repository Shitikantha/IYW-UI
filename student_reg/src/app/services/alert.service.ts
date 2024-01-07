import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

interface sweetSetting { 
  title:string, 
  text:string, 
  icon:any,
  confirmButtonText:string,
  cancelButtonText:string
} 

@Injectable({
  providedIn: 'root'
})
export class AlertService {

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

  showConfirmMsg(setting:sweetSetting){
    return Swal.fire({
      title: setting.title,
      text: setting.text,
      icon: setting.icon,
      showCancelButton: true,
      confirmButtonText: setting.confirmButtonText,
      cancelButtonText: setting.cancelButtonText
    })
  }
}

// confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, keep it'
