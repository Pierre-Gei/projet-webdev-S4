import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Message } from 'src/app/model/message';
import { ProductsService } from 'src/app/service/products.service';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent {
  listeMessage: Array<Message> = [];

  constructor(private userService: UserService, private messageService: MessagesService, private router: Router) { }

  async ngOnInit() {
    try{
      const messages = await lastValueFrom(this.messageService.getMessages());
      if (messages) {
        this.listeMessage = messages;
      }
    } catch (err) {
      this.router.navigate(['login']);
    }
  }

  removeMessage(message: Message) {
    this.messageService.deleteMessage(message).subscribe(() => {
      this.listeMessage = this.listeMessage.filter(m => m._id !== message._id);
    });
  }
  updateM(message: Message) {
    message.read = !message.read;
    this.messageService.updateMessage(message).subscribe(() => {
      this.listeMessage = this.listeMessage.map(m => {
        if (m._id === message._id) {
          return message;
        }
        return m;
      });
    }
    );
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
