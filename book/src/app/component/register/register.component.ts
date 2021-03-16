import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  mobile_no: String;

  showSucessMessage: boolean;
  showErrorMessage: boolean;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {}
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      mobile_no: this.mobile_no,
    };

    this.authService.registerUSer(user).subscribe(
      (res) => {
        this.showSucessMessage = true;
        this.showErrorMessage = false;
        console.log(res);
        setTimeout(() => (this.showErrorMessage = true), 2000);
      },
      (err) => {
        this.showErrorMessage = true;
        this.showSucessMessage = false;
      }
    );
  }
}
