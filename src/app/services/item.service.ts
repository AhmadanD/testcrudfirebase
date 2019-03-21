import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
  from 'angularfire2/firestore';
import { Item } from '../models/item'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemsComponent } from '../components/items/items.component';

@Injectable()
export class ItemService {
  itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) { 
    //buat get data
    // this.items = this.afs.collection('items').valueChanges();

    //buat add data
    this.itemCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));

    this.items = this.itemCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  //Buat get data
  getItems (){
    return this.items;
  }

  //Buat add data
  addItem (item : Item){
    this.itemCollection.add(item);
  }

  //Buat delete data
  deleteItem (item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  //Buat update data
  updateItem (item : Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}
