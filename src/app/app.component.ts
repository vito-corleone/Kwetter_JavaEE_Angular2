import { Component } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular';
  jmsMessages:  String[];

  constructor(private http: Http) {
    this.getJmsMessages();
  };

  getJmsMessages() {
    this.http.get('http://localhost:8080/Kwetter/webresources/rest/getJmsMessages')
      .subscribe((resp) => {
        console.log('getJmsMessages ' + resp.json());
        this.jmsMessages = resp.json();
      });
  }


}
