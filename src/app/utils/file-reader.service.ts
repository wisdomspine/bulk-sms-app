import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {
  constructor() {
   }

   readAsBinaryString(blob: Blob): Promise<String | ArrayBuffer>{
     return new Promise((resolve, reject) => {
       const reader = new FileReader();
       reader.onload = e => {
        if(e && e.target && e.target.result)resolve(e.target.result)
        else {
          reject(new TypeError("empty blob"))
        }
       };
       reader.onerror = e => reject(e);
       reader.readAsBinaryString(blob)
     })
   }   
   
}
