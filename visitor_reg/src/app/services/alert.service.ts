import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


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
}
