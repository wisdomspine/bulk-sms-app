import { Pipe, PipeTransform } from '@angular/core';
import * as bytes from "bytes";

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  transform(value: number, dec: number = 2): any {
    return bytes(value, {
      decimalPlaces: dec
    })
  }

}
