import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  userInfo: any;
  users: any;
  name1: any;
  email: any;
  mobile_no: any;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.userInfo = this.authService.getUser(this.user);
      this.userInfo.subscribe((data) => {
        this.name1 = data.name;
        this.email = data.email;
        this.mobile_no = data.mobile_no;
      });
    }
  }
}
