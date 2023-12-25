import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit ,OnChanges{
  @Input() tableHeader:any=[];
  @Input() tableData:any=[];

  @Output() emitAction: EventEmitter<any> = new EventEmitter();
  tableAllData:any = [];
  constructor() { }

  ngOnInit() {
   
  }
  ngOnChanges(){
    this.tableAllData = this.tableData;
  }

  takeAction(action:any,data:any){
    const actionType = {
      type:action.name,
      data:data
    }
    this.emitAction.emit(actionType);
  }

}
