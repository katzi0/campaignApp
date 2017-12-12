import { Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styles:[`
    .nav 
    {   
        height:80px;
        background-color:#039BE5
    }
    .nav-link 
    {
        color:white;
        font-size:20px;
    }
    .nav-link:hover {
        color: 
    }
    `]
})

export class HeaderComponent{
    constructor() { }

    ngOnInit() { }
}

