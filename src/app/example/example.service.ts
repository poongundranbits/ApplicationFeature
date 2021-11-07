import {AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  imageDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getImageDetailList(){
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails){
    this.imageDetailList.push(imageDetails);
  }
}
