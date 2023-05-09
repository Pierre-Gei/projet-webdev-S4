import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/message';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  newMessage: Message = {
    title: '',
    content: '',
    date: new Date(),
    phone: '',
    email: '',
    name: '',
    firstName: '',
    read: false
  };

  constructor(private router : Router, private messageService:MessagesService ) { }

  sendMessage() {
    this.newMessage.date = new Date();
    this.newMessage.read = false;
    this.messageService.addMessage(this.newMessage).subscribe(
      (message: Message) => {
        this.router.navigate(['/']);
      }
    );
    this.newMessage = {
      title: '',
      content: '',
      date: new Date(),
      phone: '',
      email: '',
      name: '',
      firstName: '',
      read: false
    };
  }

}
