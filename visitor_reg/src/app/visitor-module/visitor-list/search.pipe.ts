import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], term1: any,term2:any): any {
    if(!term1){
      return items;
    }
    if(!term2){
      return items;
    }
    let fromdate:Date = new Date(term1.year,term1.month-1,term1.day);
    let todate:Date = new Date(term2.year,term2.month-1,term2.day);

    let results: any = [];
    items.filter((val: any) => {
      if(val.checkInTime){
        let exits = new Date(val.checkInTime) >= fromdate && new Date(val.checkInTime) <= todate;
        if(exits){
          results.push(val);
        }
      }
  });
    return results;
  }

}
