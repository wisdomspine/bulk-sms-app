import { Injectable } from '@angular/core';
import { WorkSheet, utils, WorkBook, writeFile , read, SheetJSONOpts, Sheet2JSONOpts} from "xlsx";

export const DEFAULT_FILENAME: string = "workbook.xlsx";
export const DEFAULT_SHEET_NAME: string = "sheet";

@Injectable({
  providedIn: 'root'
})
export class SpreadSheetService {

  constructor() { }

  async generateWorkBook(params:{
    data: object[],
    sheetName?: string
  }): Promise<WorkBook>{
    return this.generatWorkBookSync(params);
  }

  generatWorkBookSync(params: {
    data: object[],
    filename?: string ,
    sheetName?: string
  }):WorkBook{
    if(!params.sheetName) params.sheetName = DEFAULT_SHEET_NAME;

    const ws: WorkSheet = utils.json_to_sheet(params.data);
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, params.sheetName);

    return wb;
  }

  async downloadWorkBook(wb: WorkBook, filename: string = DEFAULT_FILENAME){
    writeFile(wb, filename);
  }

  readWorkBookSync(data: any): WorkBook{
    return read(data, {
      type: "binary"
    })
  }

  async readWorkBook(data: any): Promise<WorkBook>{
    return this.readWorkBookSync(data);
  }

  readSheetSync(wb: WorkBook, sheet: any): WorkSheet{
    return wb.Sheets[sheet];
  }

  async readSheet(wb: WorkBook, sheet: any): Promise<WorkSheet>{
    return this.readSheetSync(wb, sheet)
  }

  getJSONSync(sheet: WorkSheet, options:Sheet2JSONOpts = {
    defval: null,
    header: 1
  }): any{
    return utils.sheet_to_json(sheet, options);
  }

  async getJSON(sheet: WorkSheet, options?:Sheet2JSONOpts): Promise<any>{
    if(options)return this.getJSONSync(sheet, options);
    else return this.getJSONSync(sheet);
  }

}
