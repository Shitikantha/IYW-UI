import { Component,EventEmitter,HostListener,Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';

interface Modal {
  isOpen?: boolean;
  title?:string;
  isFooter?:boolean;
  size?:any
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit{
  @Input() modalSetting:Modal = {
    isOpen: false,
    title: '',
    isFooter: false,
    size: 'md'
  };
  size:any = {'xl':'xl','lg':'lg','md':'md','sm':'sm'}
  @Output() close:EventEmitter<any>= new EventEmitter();

  constructor(public modal : NgbActiveModal,
    private modalService : NgbModal,
    private alertService : AlertService
    ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false);
  }

  get screenSize(){
    if(!this.modalSetting.size){
      return 'md'
    }
    return this.size[this.modalSetting.size];
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydown() {
    this.closeModal()
  }
  

 


}
