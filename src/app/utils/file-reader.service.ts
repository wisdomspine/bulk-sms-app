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
       reader.onload = (e:any) => {
         try{
          resolve(e.target.result);
         }
        catch(f) {
         reject(f)
        }
       };
       reader.onerror = e => reject(e);
       reader.readAsBinaryString(blob)
     })
   }   
   
}
