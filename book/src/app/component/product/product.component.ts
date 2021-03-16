import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  books: any;
  users: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);

    let book = this.http.get(`http://localhost:3000/api/${id}`);
    book.subscribe((data) => {
      this.books = data;
      localStorage.setItem('category', this.books.category);
      //console.log(localStorage.getItem('category'))
    });
  }
}
