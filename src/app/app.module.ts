import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { appReducers } from './store';
import { BattlefieldModule } from './battlefield/battlefield.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducers),
    BattlefieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
