import { Component, Injectable, ChangeDetectorRef, Input, Attribute } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { UserPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";


@Component({
    selector: 'my-app',
    templateUrl: './startpage.component.html',
})
@Injectable()
export class StartpageComponent {
    updatePeriodTypes: any;
    // the user that is authenticated

    user = <User>{};

    @Input()
    userAuthenticated: UserPrivate;

    userEmail: string;
    // the list of the people that the user is following
    userFollowing: User[];
    // a list of users who follow this user
    userFollowedBy: User[];
    // the timeline postings, inlude postings of the user and the people the user follows
    userTimelinePostings: Posting[];
    // the most recent made kweet of the user
    userRecentPost = <Posting>{};
    // List that contains all the postings that contain the searchKeyword
    searchResultPostings = <Posting>{};


    constructor(private http: Http, private _cdRef: ChangeDetectorRef,private router: Router) {
        this.userEmail = localStorage.getItem("user");
        if(localStorage.getItem("userRole") != 'User'){
            this.router.navigate(['/loginpage']);
        }
        this.getUserPublic();
        this.getThePeopleThatIFollow();
        this.getThePeopleThatFollowMe();
        this.getTimelinePostings();
    };

    // ngOnInit() {
    //     if (this.userAuthenticated != null) {
    //         this.userEmail = localStorage.getItem("user");
    //         console.log('localStorage ' + localStorage.getItem("user"));
    //         this.getUserPublic();
    //         this.getThePeopleThatIFollow();
    //         this.getThePeopleThatFollowMe();
    //         this.getTimelinePostings();
    //     }
    // }

    getUserPublic() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/' + this.userEmail)
            // this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('getUserPublic ' + resp.json());
                this.user = <User>resp.json();
            });
    }

    updateUserInfo(name: string, bio: string, location: string, website: string) {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/updateUserInfo/' + this.user.emailAddress + '/' + name + '/' + bio + '/' + location + '/' + website)
            .subscribe((resp) => {
                console.log('saveUser ' + resp.json());
                this.user = <User>resp.json();
            });
    }

    getThePeopleThatIFollow() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatIFollow/vito@kwetter.com/')
            .subscribe((resp) => {
                console.log('getThePeopleThatIFollow ' + resp.json());
                this.userFollowing = resp.json();
            });
    }

    getThePeopleThatFollowMe() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatFollowMe/vito@kwetter.com/')
            .subscribe((resp) => {
                console.log('getThePeopleThatFollowMe ' + resp.json());
                this.userFollowedBy = resp.json();
            });
    }

    getTimelinePostings() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getTimelinePostings/vito@kwetter.com/')
            .subscribe((resp) => {
                console.log('getTimelinePostings ' + resp.json());
                this.userTimelinePostings = resp.json();
                // this._cdRef.markForCheck();
            });
    }

    createPost(newKweet: string) {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/user/posting/createPosting/' + this.user.id + '/' + newKweet)
            .subscribe((resp) => {
                console.log('createPost ' + resp.json());
                this.userRecentPost = resp.json();
                this.getTimelinePostings();
                this._cdRef.markForCheck();
            });
    }

    // Fire a search action based on provided keyword
    getSearchResult(searchKeyword: string) {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getSearchResult/' + searchKeyword)
            .subscribe((resp) => {
                console.log('getSearchResult' + resp.json());
                this.searchResultPostings = resp.json();
                this._cdRef.markForCheck();
            });
    }
}

