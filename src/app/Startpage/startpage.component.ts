import { Component, Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { userPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";


@Component({
    selector: 'my-app',
    templateUrl: './startpage.component.html',
})
@Injectable()
export class StartpageComponent {

    // properties
    //title = 'This is the title from the StarPage-component';
    // the private user object of the currently user, contains all public and private information    
    // user: userPrivate;
    user = <User>{};
    userFollowing: User[];
    userFollowedBy: User[];
    userPostings: Posting[];
    userFriend = <User>{};
    userRecentPost = <Posting>{};

    // bidirectional value with the new Kweet field
    postingContent: string;


    // bidirectional value with the search field
    searchKeyword: string;
    // List that contains all the postings that contain the searchKeyword
    searchResultPostings = <Posting>{};


    title = 'Vito';

    // CORS meldingen -> resources.add(CORSResponseFilter.class) verdwijnt

    apiUrl = 'http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com';

    constructor(private http: Http) {
        this.getUserPublic();
        this.getThePeopleThatIFollow();
        this.getThePeopleThatFollowMe();
        this.getAllPostings();
    };

    getUserPublic() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('getUserPublic ' + resp.json());
                this.user = <User>resp.json();
            });
    }

    getThePeopleThatIFollow() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatIFollow/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('getThePeopleThatIFollow ' + resp.json());
                this.userFollowing = resp.json();
            });
    }

    getThePeopleThatFollowMe() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatFollowMe/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('getThePeopleThatFollowMe me ' + resp.json());
                this.userFollowedBy = resp.json();
            });
    }

    getAllPostings() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getAllPostings/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('getAllPostings me ' + resp.json());
                this.userPostings = resp.json();
            });
    }

    // create new Kweet
    getCreatePost() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/user/posting/createPosting/1/' + this.postingContent)
            .subscribe((resp) => {
                console.log('getCreatePost ' + resp.json());
                this.userRecentPost = resp.json();
            });
        this.postingContent = '';
        this.getAllPostings();
    }

    // Fire a search action based on provided keyword
    getSearchResult() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getSearchResult/' + this.searchKeyword)
            .subscribe((resp) => {
                console.log('getSearchResult me ' + resp.json());
                this.searchResultPostings = resp.json();
            });
        this.searchKeyword = '';
    }



    // getAllPostingsAJAX() {
    //     this.http.get('http://localhost:8080/Kwetter/webresources/rest/posting/getAllPostings/vito@kwetter.com')
    //     .map(res => res.json())
    //         .subscribe((result) => this.userPostings = result);
    // }

    onSubmit() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/user1@kwetter.com')
            .subscribe((resp) => {
                this.userFriend = <User>resp.json();
                console.log(this.userFriend.location);
            });
    }

}

