import { Component, Injectable, ChangeDetectorRef, Input, Attribute } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { UserPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { Message } from "../Domain/Message/Message";


@Component({
    selector: 'my-app',
    templateUrl: './startpage.component.html',
})
@Injectable()
export class StartpageComponent {
    updatePeriodTypes: any;
    // the user that is authenticated
    user = <User>{};
    // websocket var
    websocket: WebSocket;
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
    // search result switch
    search: boolean;
    // received posting
    receivedPosting: Posting;




    constructor(private http: Http, private _cdRef: ChangeDetectorRef, private router: Router) {
        this.userEmail = localStorage.getItem("user");
        if (localStorage.getItem("userRole") != 'User') {
            this.router.navigate(['/loginpage']);
        }
        this.getUserPublic();
        this.getThePeopleThatIFollow();
        this.getThePeopleThatFollowMe();
        this.getTimelinePostings();
    };

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
                this.search = false;
                this._cdRef.markForCheck();
            });
    }

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

    addNewPosting(posting: Posting){
        console.log(posting);
        this.userTimelinePostings.push(posting);
        this._cdRef.markForCheck();
    }

    onMessage(){
        var message;
        this.websocket.onmessage = function (evt){
            message = JSON.parse(evt.data);  
            console.log(message);        
        }
        this.addNewPosting(message);
    
    }

    connect() {
        //WebSocket placeholder
        this.websocket = new WebSocket('ws://localhost:8080/Kwetter/endpoint/' + this.user.emailAddress);        
        //atach event listeneres
        this.websocket.onopen = function () {
            console.log('blue', 'CONNECTED');
        };
        this.websocket.onclose = function () {
            console.log('blue', 'DISCONNECTED');
        };
        this.websocket.onmessage = function (evt) {
            //convert json to javascript object
             //console.log(evt.data);
             var message = JSON.parse(evt.data);  
             console.log(message); 
            //write message.text to screen
            // console.log('green', 'I: ' + message.text);
        };
        this.websocket.onerror = function (event) {
            console.log('red', 'ERROR: ' + event);
        };
        
    }



    sendMessage(text: string) {
        let messageObject = new Message(this.user.emailAddress, text);
        let message = JSON.stringify(messageObject);
        console.log(message);
        this.websocket.send(message);
    }
}

