import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { StartpageComponent}  from './Startpage/startpage.component';
import { routing }  from './app.routing';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, routing, HttpModule, FormsModule ],
  declarations: [ AppComponent, StartpageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
