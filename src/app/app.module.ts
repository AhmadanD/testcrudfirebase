import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import { ItemsComponent } from './components/items/items.component';
import { ItemService} from './services/item.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ItemsComponent, NavbarComponent, AddItemComponent],
  imports: [
    BrowserModule,
    FormsModule,
    // AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase,'latihanDBFirebase'),
    AngularFirestoreModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }

