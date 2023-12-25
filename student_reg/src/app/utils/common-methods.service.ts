import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  textOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 32
    ) {
      return true;
    }
    return false;
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      return false;
    }
    return true;
  }
}
