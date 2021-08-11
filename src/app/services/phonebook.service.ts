// import { Phonebook } from './../components/phonebook/phonebook';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PhonebookService {
  url = 'http://localhost:5000/phonebooks/';

  constructor(private http: HttpClient) {}

  postPhonebook(data: any) {
    return this.http.post<any>(this.url, data);
  }

  getPhonebook() {
    return this.http.get(this.url);
  }

  deletPhonebook(pbook: any) {
    return this.http.delete<any>(this.url + pbook.id);
  }

  editPhonebook(pbook: any) {
    return this.http.put<any>(this.url + pbook.id, pbook);
    
    
  }
}
