import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'pagination',
    templateUrl: 'pagination.html'
})

export class PaginationComponent {
    @Input() collectionSize:Number;
    @Input() searchParams:string;
    @Output() onPageClick = new EventEmitter();
    constructor() { }
    page = 1;
    // totalItems = 64;
    // currentPage = 4;
    // smallnumPages = 0;
   
    // setPage(pageNo: number): void {
    //   this.currentPage = pageNo;
    // }
   
    pageChanged(currentPageNumber: number): void {
      console.log('Page changed to: ' + currentPageNumber);
      this.onPageClick.emit(currentPageNumber);
    //   console.log('Number items per page: ' + event.itemsPerPage);
    }


    getNext(){
        this.onPageClick.emit("next");
    }

    getPrevious(){
        this.onPageClick.emit("previous");
    }

    isSearchEmpty(){
        if(this.searchParams != ""){
            return true;
        }
        else{
            return false;
        }
    }

}