import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css'],
})
export class UserBookComponent implements OnInit {
  user: any;
  bookInfo: any;
  books: any;
  length: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.bookInfo = this.http.get(
        `http://localhost:3000/api/user/${this.user}`
      );
      this.bookInfo.subscribe((data) => {
        this.books = data;
        this.length = data.length;
      });
      console.log(this.books);
    }
  }
}
