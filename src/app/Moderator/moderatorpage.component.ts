import { Component, Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from "../Domain/User/User";
import { userPrivate } from "../Domain/User/userPrivate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Posting } from "../Domain/Posting/Posting";

@Component({
    selector: 'my-app',
    templateUrl: './moderatorpage.component.html',
})
@Injectable()
export class ModeratorpageComponent {



}
