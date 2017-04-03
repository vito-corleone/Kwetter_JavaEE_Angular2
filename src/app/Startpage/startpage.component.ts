import { Component, Injectable, ChangeDetectorRef } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { UserPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";
import { Subject } from "rxjs/Subject";


@Component({
    selector: 'my-app',
    templateUrl: './startpage.component.html',
})
@Injectable()
export class StartpageComponent {
    // the user that is authenticated
    user = <User>{};
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

    search: boolean = false;

    private timeLine: Subject<any> = new Subject<any>();
    private searching: Subject<boolean> = new Subject<boolean>();


    constructor(private http: Http, private _cdRef: ChangeDetectorRef) {
        this.getUserPublic();
        this.getThePeopleThatIFollow();
        this.getThePeopleThatFollowMe();
        this.getTimelinePostings();
    };

    getUserPublic() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com')
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


    // getTimelinePostings() {
    //     this.searching.next(true);
    //     this.http.get('http://localhost:8080/Kwetter/webresources/rest/getTimelinePostings/vito@kwetter.com/')
    //         .subscribe(response => {
    //             this.timeLine.next(response.json());
    //             console.log('getTimelinePostings' + response.json());
    //             this.searching.next(false);
    //         });
    // }

    createPost(newKweet: string) {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/user/posting/createPosting/' + this.user.id + '/' + newKweet)
            .subscribe((resp) => {
                console.log('createPost ' + resp.json());
                this.userRecentPost = resp.json();
                this.getTimelinePostings();
                this.search = false;
                this._cdRef.markForCheck();
            });
    }

    //     createPost(newKweet: string) {
    //     this.http.get('http://localhost:8080/Kwetter/webresources/rest/user/posting/createPosting/' + this.user.id + '/' + newKweet)
    //         .subscribe((resp) => {
    //             console.log('createPost ' + resp.json());
    //             this.userRecentPost = resp.json();
    //             this.getTimelinePostings();
    //             this._cdRef.markForCheck();
    //         });
    // }

    // create new Kweet
    // createPost(newKweet: string) {
    //     this.searching.next(true);
    //     this.http.get('http://localhost:8080/Kwetter/webresources/rest/user/posting/createPosting/' + this.user.id + '/' + newKweet)
    //         .subscribe(response => {
    //             this.timeLine.next(response.json());
    //             this.searching.next(false);
    //         });



    // Fire a search action based on provided keyword
    getSearchResult(searchKeyword: string) {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getSearchResult/' + searchKeyword)
            .subscribe((resp) => {
                console.log('getSearchResult' + resp.json());
                this.searchResultPostings = resp.json();
                this.search = true;
                this._cdRef.markForCheck();
            });
    }
}

