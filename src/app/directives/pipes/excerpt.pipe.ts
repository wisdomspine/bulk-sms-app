import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appExcerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(value: any, limit: number =40, overflow: string = "..."): any {
    const str: string = value+""
    if(str.length > limit) return str.substring(0, limit+1)+overflow;
    else return str
    
  }

}
