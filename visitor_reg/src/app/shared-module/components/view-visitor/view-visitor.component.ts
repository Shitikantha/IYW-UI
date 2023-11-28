import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-visitor',
  templateUrl: './view-visitor.component.html',
  styleUrls: ['./view-visitor.component.css']
})
export class ViewVisitorComponent implements OnInit{
  constructor(public modal : NgbActiveModal) { }
@Input() viewData:any;
imagePath:any= "assets/img/avtar.jpg";

ngOnInit(): void {
  if(this.viewData.image){
    this.imagePath = window.atob(this.viewData.image)
  }
}
print(){
  window.print();
}
}
