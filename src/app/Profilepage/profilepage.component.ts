import { Component, Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { UserPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'my-app',
    templateUrl: './profilepage.component.html',
})
@Injectable()
export class ProfilepageComponent {
    // holds the userEmailAddress
    userEmailAddress: string;
    // holds the user object
    user = <User>{};
    // holds a list of the users that are being followd by this user
    userFollowing: User[];
    // holds a list of the users that are following this user
    userFollowedBy: User[];
    // holds a list of the user userPostings
    userPostings: Posting[];


    constructor(private route: ActivatedRoute, private router: Router, private http: Http) {
        this.userEmailAddress = router.parseUrl(router.url).queryParams["userEmailAddress"];
        console.log("Extracted value: ")
        console.log(this.userEmailAddress);
        this.getUserPublic();
        this.getThePeopleThatIFollow();
        this.getThePeopleThatFollowMe();
        this.getAllPostings();
    }

    // after retrieving the userEmailAddress it's time to retrieve the user data and view on the profilepage
    getUserPublic() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/' + this.userEmailAddress)
            .subscribe((resp) => {
                console.log('getUserPublic ' + resp.json());
                this.user = <User>resp.json();
            });
    }

    getThePeopleThatIFollow() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatIFollow/' + this.userEmailAddress)
            .subscribe((resp) => {
                console.log('getThePeopleThatIFollow ' + resp.json());
                this.userFollowing = resp.json();
            });
    }

    getThePeopleThatFollowMe() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatFollowMe/' + this.userEmailAddress)
            .subscribe((resp) => {
                console.log('getThePeopleThatFollowMe' + resp.json());
                this.userFollowedBy = resp.json();
            });
    }

    getAllPostings() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getAllPostings/'+ this.userEmailAddress)
            .subscribe((resp) => {
                console.log('getAllPostings' + resp.json());
                this.userPostings = resp.json();
            });
    }

    // connect(){
    //     var ws = new $WebSocket("ws://localhost:8080/Kwetter/endpoint");
    // }
    

    

}
