import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { SlideComponent } from './slide/slide.component';
import { slideReducer } from './reducer';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    SlideComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(slideReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
