import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private url:string = 'http://localhost:3000/messages';

  constructor(private http: HttpClient ) {}

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, message, { withCredentials: true });
  }
}
