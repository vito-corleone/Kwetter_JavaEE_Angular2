import { Component, Injectable, ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { UserPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { StartpageComponent } from '../Startpage/startpage.component'



@Component({
    selector: 'my-app',
    templateUrl: './login.component.html',
})
@Injectable()
export class LoginComponent {

    isLoggedIn: boolean = false;
    startpage = <StartpageComponent>{};

    // startpage: 


    user = <UserPrivate>{};

    constructor(
        private http: Http,
        private router: Router
    ) {
        
    }

    login(username: string, password: string) {
        const body = {
            username,
            password
        };
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/login/' + username + '/' + password)
            .subscribe((resp) => {
                console.log('loginUser ' + resp.json());
                this.user = <UserPrivate>resp.json();
                if (this.user != null) {
                    console.log('user is not null ' + this.user.name)
                    this.isLoggedIn = true;
                    if (this.user.userRole == 'User') {
                        localStorage.setItem("user", this.user.emailAddress);
                        localStorage.setItem("userRole", this.user.userRole);
                        this.router.navigate(['/startpage']);
                    } else if (this.user.userRole == 'Moderator') {
                        localStorage.setItem("user", this.user.emailAddress);
                        localStorage.setItem("userRole", this.user.userRole);
                        this.router.navigate(['/moderatorpage']);
                    }
                }
            });
    }


    logout(): void {
        localStorage.clear();
        this.isLoggedIn = false;
    }
}