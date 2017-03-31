import {Component} from '@angular/core';

@Component({
    selector: 'my-startpage',
    templateUrl: './startpage.component.html',
})
export class StartpageComponent {
    welcome : string;
    constructor(){
        this.welcome = "Welcome to Startpage";
    };
};