import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAuthService } from 'src/app/services/book-auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  books: any;
  category: any;
  city: any;
  selectCity: any;
  name: any;
  book1: any;
  p: number = 1;
  length: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private book: BookAuthService
  ) {}

  ngOnInit(): void {
    this.selectCity = localStorage.getItem('city');
    this.name = this.route.snapshot.params['name'];

    if (this.selectCity === null) {
      //console.log(name);
      this.book1 = this.book.search(this.name).subscribe((data) => {
        this.books = data;
        this.length = this.books.length;
      });
    } else {
      //console.log(name);
      this.book1 = this.http.get(
        `http://localhost:3000/api/book1/${this.name}/${this.selectCity}`
      );
      this.book1.subscribe((data) => {
        this.books = data;
        this.length = this.books.length;
      });
    }
  }
}
