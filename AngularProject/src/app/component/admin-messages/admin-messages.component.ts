import { Component, OnInit,HostListener } from '@angular/core';
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
  selectedMessage: Message = {
    title: '',
    content: '',
    date: new Date(),
    phone: '',
    email: '',
    name: '',
    firstName: '',
    read: false
  };
  isSmallScreen: boolean = false;


  constructor(private userService: UserService, private messageService: MessagesService, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth < 768;
    console.log(this.isSmallScreen);
  }

  async ngOnInit() {
    try{
      this.isSmallScreen = window.innerWidth < 768;
      console.log("on init" +this.isSmallScreen);
      const messages = await lastValueFrom(this.messageService.getMessages());
      if (messages) {
        this.listeMessage = messages;
        this.sortMessages();
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

  messageRead(message: Message) {
    message.read = true;
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
  sortMessages() {
    this.listeMessage.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  correctDate(date: Date) {
    return new Date(date).toLocaleString('fr-FR');
  }

  selectMessage(message: Message) {
    this.selectedMessage = message;
  }

  deleteMessage(message: Message) {
    //chercher dans la liste le message selectionner pour supprimer le bon
    this.listeMessage = this.listeMessage.filter(m => m._id !== message._id);
    this.messageService.deleteMessage(message).subscribe(() => {
      this.listeMessage = this.listeMessage.filter(m => m._id !== message._id);
    }
    );
    this.selectedMessage = {
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
 initSelectedMessage() {
    this.selectedMessage = {
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

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }


}
