import { Component, Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "../User";
import { userPrivate } from "../userPrivate";


@Component({
    selector: 'my-app',
    templateUrl: './startpage.component.html',
})
@Injectable()
export class StartpageComponent {

    // properties
    title = 'This is the title from the StarPage-component';
    // the private user object of the currently user, contains all public and private information    
    // user: userPrivate;
    user = <User>{};
    userFollowing: User[];
    userFollowedBy: User[];

    // CORS meldingen -> resources.add(CORSResponseFilter.class) verdwijnt

    apiUrl = 'http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com';

    constructor(private http: Http) {
        this.getUserPublic();
        this.getThePeopleThatIFollow();
        this.getThePeopleThatFollowMe();
    };

    getUserPublic() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('retrieved user ' + resp.json());
                this.user = <User>resp.json();
                console.log(this.user.location);
            });
    }

    getThePeopleThatIFollow() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatIFollow/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('i follow ' + resp.json());
                this.userFollowing = resp.json();
            });
    }

    getThePeopleThatFollowMe() {
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getThePeopleThatFollowMe/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('follow me ' + resp.json());
                this.userFollowedBy = resp.json();
            });
    }
}

