import { Component, Injectable } from '@angular/core';
import { Http } from "@angular/http";
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import { User } from "../User";


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
     user =  <User>{};
    apiUrl = 'http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com';

    constructor(private http: Http) {        
        this.getUserPublic();
            
        // this.friends = [
        //     new userPublic('Vito', 'Geen bio', 'Roermond', 'www.test.nl', 'geen fotopath'),
        //     new userPublic('Demo', 'Beetje bio', 'Roermond', 'www.abc.nl', 'geen fotopath'),
        //     new userPublic('Master', 'Veel bio', 'Roermond', 'www.whollah.nl', 'geen fotopath')
        // ];
    };

    getUserPublic() {
        console.log('start method');
        this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPublicUserInfo/vito@kwetter.com')
            .subscribe((resp) => {
                console.log('during method');
                console.log('result ' + resp.json());
                this.user = <User> resp.json();
                console.log(this.user.location);
            });
             console.log('stop method');
    }

    // getUser() {
    //     return this.http.get(this.apiUrl).map(res => res.json());
    // }


    // getAll(): Observable<userPrivate> {
    //     return this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPrivateUserInfo/' + 'vito@kwetter.com')
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body.data || {};
    // }
    // private handleError(error: Response | any) {
    //     // In a real world app, you might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }



    // // method for retrieving all the user info available
    // getUserPrivate(emailAddres: string) {
    //     return this.http.get('http://localhost:8080/Kwetter/webresources/rest/getPrivateUserInfo/' + emailAddres)
    //         .subscribe((resp) => {
    //             this.user = resp.json();
    //         });
    // }

};