import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    try {
      await firstValueFrom(this.userService.isConnected());
      console.log('connected');
    } catch (error) {
      this.router.navigate(['login']);
    }
  }

}