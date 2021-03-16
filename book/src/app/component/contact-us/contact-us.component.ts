import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  name : String ;
  email : String ;
  msg :String ;
  mobile_no : String ;

  constructor(private http:HttpClient , private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const user = {
      fullName : this.name ,
      email :this.email ,
      msg : this.msg ,
      mobile_no :this.mobile_no
    }
    this.http.post('http://localhost:3000/contactus/',user).subscribe(
      res=>{
        console.log("hello");
        this.router.navigateByUrl('/home');
      }
    )
  }

}
