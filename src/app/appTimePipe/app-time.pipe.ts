import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTime'
})
export class AppTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
   return Math.floor(value/60)+' minutes '+value%60+' seconds'; 
    
  }

}
