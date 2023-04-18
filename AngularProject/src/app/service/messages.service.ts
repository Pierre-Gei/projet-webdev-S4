import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private url:string = 'http://localhost:3000/messages/';

  constructor(private http: HttpClient ) {}

  getMessages(): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(this.url, { withCredentials: true });
  }

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, message, { withCredentials: true });
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(this.url + message._id, message, { withCredentials: true });
  }

  deleteMessage(message: Message): Observable<Message> {
    return this.http.delete<Message>(this.url + message._id, { withCredentials: true });
  }
}
