import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddVisitorsService } from 'src/app/services/add-visitors.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-update-visitor-profile',
  templateUrl: './update-visitor-profile.component.html',
  styleUrls: ['./update-visitor-profile.component.css']
})
export class UpdateVisitorProfileComponent implements OnInit {
  @Input() updateData:any;
  updateProfile:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,private activeModal : NgbActiveModal,
    private visitorService:AddVisitorsService,
    private alertService:AlertService) { 
    this.updateProfile = this.fb.group({
      name:['',Validators.required],
      contactPerson:['',Validators.required],
      contactNumber:['',Validators.required],
      approvalStatus:['',Validators.required]
    })
  }

  get f(){
    return this.updateProfile['controls'];
  }


  ngOnInit(): void {
    if(Object.keys(this.updateData).length > 0){
      this.patchValue(this.updateData);
    }
  }

  onSubmit(){
    this.submitted = true;
    if(this.updateProfile.valid){
      this.updateVisitors();
    }
  }

  patchValue(formValue:any){
    this.updateProfile.patchValue({
      name:formValue?.visitorName,
      contactPerson:formValue?.contactPerson,
      contactNumber:formValue?.contactNo,
      approvalStatus:formValue?.approvalStatus,
    });
  }

  cancel(){
    this.activeModal.close();
  }

  updateVisitors(){
    let payload ={
      visitorName:this.updateProfile.controls['name'].value,
      contactPerson:this.updateProfile.controls['contactPerson'].value,
      contactNo:this.updateProfile.controls['contactNumber'].value,
      approvalStatus:this.updateProfile.controls['approvalStatus'].value,
      visitorId:this.updateData.visitorId,
      id:this.updateData.id
    }
   
     this.visitorService.updateVisitors(payload).subscribe({
      next: (result: any) => {
        this.alertService.showSuccessToast({msg:'Visitor Details Updated ....!'});
        this.activeModal.close(true);
        },
        error: (err: any) => {
          this.alertService.showErrorToast({msg:'Something went wrong....!'});
        },
     });
  }

}
