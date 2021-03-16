import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookAuthService } from 'src/app/services/book-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: any;
  category: any;
  city: any;
  sub: any;
  sub1: any;
  sub2: any;
  p: number = 1;
  a: any;
  constructor(private http: HttpClient, private book: BookAuthService) {}

  ngOnInit(): void {
    this.a = localStorage.getItem('city');
    this.getBooks(this.a);
    this.getCategory();
    this.a = this.book.city$.subscribe((data) => {
      this.city = data;
      this.getBooks(this.city);
    });
  }
  getBooks(city1: string) {
    console.log(city1);
    this.city = city1;
    if (this.city === null) {
      this.sub1 = this.book.getBook().subscribe((data) => (this.books = data));
    } else {
      this.sub1 = this.book
        .getCity(this.city)
        .subscribe((data) => (this.books = data));
    }
  }
  getCategory() {
    this.sub2 = this.book
      .getdistinctcategory()
      .subscribe((data) => (this.category = data));
  }
  // getBookByCategory(category) {
  //   this.city = localStorage.getItem('city');
  //   if (this.city === null) {
  //     this.sub = this.book
  //       .getBycategory(category)
  //       .subscribe((data) => (this.books = data));
  //   } else {
  //     this.sub = this.book
  //       .getCityWithCategory(category, this.city)
  //       .subscribe((data) => (this.books = data));
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  //   this.sub1.unsubscribe();
  //   this.sub2.unsubscribe();
  // }
}
