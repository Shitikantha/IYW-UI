import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent implements OnInit{
  @Input() viewData:any;

  className!:string;
  subjectList!:string;

  ngOnInit(): void {
    this.className = this.viewData.classSubjects[0]?.classes?.name;
    this.subjectList = [this.viewData.classSubjects[0]?.subject].map((val:any)=>val.name).join(',');
  }
}
