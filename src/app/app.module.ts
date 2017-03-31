import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { StartpageComponent}  from './Startpage/startpage.component';
import { routing }  from './app.routing';

@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ AppComponent, StartpageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
