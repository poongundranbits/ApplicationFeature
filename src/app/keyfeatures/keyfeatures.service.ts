import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  url = 'https://applicationfeature.firebaseio.com/Keyfeatures.json'

  constructor(private http: HttpClient) { }

  Fetch() {
    return this.http.get('https://applicationfeature.firebaseio.com/Keyfeatures/.json');
  }

  Add(value) {
    return this.http.post(this.url, value)
  }

  Update(editId, value) {
    return this.http.put('https://applicationfeature.firebaseio.com/Keyfeatures/' + editId + '.json', value)
  }
  Delete(id) {
    return this.http.delete('https://applicationfeature.firebaseio.com/Keyfeatures/' + id + '.json');
  }


}