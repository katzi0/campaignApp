import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { List } from './list';
import { Http, Response, RequestOptions } from '@angular/http';


@Component({
    selector: '[list-component]',
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {
    // list:List;
    http:Http;
    @Input() list;
    @Input() index;
    @Output() onTemplateContextEdit = new EventEmitter();
    csvData: any[] = [];
    emails:string;
    constructor() {
        
     }

    ngOnInit() { }

    readCsvData(){

    }

    listDeActivate(disable:string){
        disable=='1'?this.list.status = false:this.list.status = true;
        this.onTemplateContextEdit.emit(this.list);
    }
   
    // public changeListener(files: FileList){
    //     console.log(files);
    //     if(files && files.length > 0) {
    //        let file : File = files.item(0); 
    //          console.log(file.name);
    //          console.log(file.size);
    //          console.log(file.type);
    //          let reader: FileReader = new FileReader();
    //          reader.readAsText(file);
    //          reader.onload = (e) => {
    //             let csv: string = reader.result;
    //             this.emails  = csv;
    //             console.log(this.emails.match(/ /).length);
    //            this.extractData(csv);
    //          }
    //       }
    //   }

    //   private extractData(res: any) {
        
    //         // let csvData = res['_body'] || '';
    //         let allTextLines = res.split(/\r\n|\n/);
    //         let headers = allTextLines[0].split(',');
    //         let lines = [];
        
    //         for ( let i = 0; i < allTextLines.length; i++) {
    //             // split content based on comma
    //             let data = allTextLines[i].split(',');
    //             if (data.length == headers.length) {
    //                 let tarr = [];
    //                 for ( let j = 0; j < headers.length; j++) {
    //                     tarr.push(data[j]);
    //                 }
    //                 lines.push(tarr);
    //             }
    //         }
    //         this.csvData = lines;
    //       }


}