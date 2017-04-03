import { Component, Injectable, ChangeDetectorRef } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { UserPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";
import { User } from "../Domain/User/User";
import { Router } from "@angular/router";

@Component({
    selector: 'my-app',
    templateUrl: './moderatorpage.component.html',
})
@Injectable()
export class ModeratorpageComponent {
    // value that will hold the keyword to find a user with
    searchUserKeyword: string;
    // a moderator has access to all the information of the user, this is called a userPrivate object
    userPrivate = <UserPrivate>{};
    // holds a list of the user userPostings
    userPostings: Posting[];
    // the result of void funtions
    result: string;
    // all the kweets
    allPostings: Posting[];
    // all the users 
    allUsers: User[];

    constructor(private http: Http, private router: Router,private _cdRef: ChangeDetectorRef) {
        if(localStorage.getItem("userRole") != 'Moderator'){
            this.router.navigate(['/loginpage']);
        }

    };

    // method to find a user, for now based only on emailaddress
    findUser() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPrivateUserInfo/' + this.searchUserKeyword)
            .subscribe((resp) => {
                console.log('findUser ' + resp.json());
                this.userPrivate = <UserPrivate>resp.json();
            });
    }

    saveUser(name: string, bio: string, location: string, website: string, userrole: string) {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/editUser/' + this.userPrivate.emailAddress + '/' + name + '/' + bio + '/' + location + '/' + website + '/' + userrole)
            .subscribe((resp) => {
                console.log('saveUser ' + resp.json());
                this.findUser();
            });
    }

    getUserPostings() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getAllPostings/' + this.userPrivate.emailAddress)
            .subscribe((resp) => {
                console.log('getUserPostings ' + resp.json());
                this.userPostings = resp.json();
            });
    }

    removePost(postid: string) {
        console.log(postid);
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/removePost/' + postid)
            .subscribe((resp) => {
                console.log('removePost ' + resp.json());
                this.result = resp.json();                
            });

    }

    removeUser(userId: string) {
        console.log(userId);
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/removeUser/' + userId)
            .subscribe((resp) => {
                console.log('removeUser ' + resp.json());
                this.result = resp.json();
                this.getAllUsers();
                this._cdRef.markForCheck();
            });
    }

    getAllKweets() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getAllKweets/')
            .subscribe((resp) => {
                console.log('getAllKweets ' + resp.json());
                this.allPostings = resp.json();
            });
    }

    getAllUsers() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getAllUsers/')
            .subscribe((resp) => {
                console.log('getAllUsers ' + resp.json());
                this.allUsers = resp.json();
            });
    }


}
