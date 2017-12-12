import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { List } from '../../lists/list';

@Component({
    selector: 'table-header',
    templateUrl: './table.header.html'
})

export class TableHeaderComponent implements OnInit {
    numOfResultsPerPageStr: string = "10";
    numOfResultsPerPage: number = 10;
    isAddTemplate:boolean = false;
    @Input() collectionSize:number;
    searchParams:string;
    // @Output() searchParams:string;
    @Output() onKeyPressAutoComplete = new EventEmitter();
    @Output() onNumOfResultsPerPageChange = new EventEmitter();
    constructor() { }

    ngOnInit() { }


    KeyPressAutoComplete(event: KeyboardEvent){
        console.log("KeyPressAutoComplete"+event);
        this.searchParams = (<HTMLInputElement>event.target).value;
        this.onKeyPressAutoComplete.emit(this.searchParams);
    }
    NumOfResultsPerPageChange(){
        console.log("NumOfResultsPerPageChange"+this.numOfResultsPerPageStr);
        this.onNumOfResultsPerPageChange.emit(this.numOfResultsPerPageStr);
    }
    
}