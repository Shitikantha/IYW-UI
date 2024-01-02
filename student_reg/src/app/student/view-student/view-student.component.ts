import { Component, Input, OnInit } from '@angular/core';
import { ParentMeta } from './parentMeta';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit{
  @Input() viewData:any;

  className!:string;
  subjectList!:string;
  parentHeader:any = [];
  parentData:any = [];

  ngOnInit(): void {
    this.className = this.viewData.classSubjects[0]?.classes?.name;
    this.subjectList = !Array.isArray(this.viewData.classSubjects)?
    this.viewData.classSubjects[0].subject:this.viewData.classSubjects.map((ele:any)=>ele.subject.name).join(',');
    this.parentHeader = ParentMeta;
    this.parentData = this.viewData.relationships.map((val:any)=>{
      return {...val,...val.relatedUserDetail}
    });
  }
}
