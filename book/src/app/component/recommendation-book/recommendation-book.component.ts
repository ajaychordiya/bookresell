import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommendation-book',
  templateUrl: './recommendation-book.component.html',
  styleUrls: ['./recommendation-book.component.css']
})
export class RecommendationBookComponent implements OnInit {
  books : any ;
  cate:any;
  constructor(private http:HttpClient ) { }

  ngOnInit(): void {

    this.cate = localStorage.getItem('category')
    let book = this.http.get(`http://localhost:3000/api/category/${this.cate}`);
    book.subscribe((data) => {this.books = data
      //localStorage.setItem('category',this.books.category);
      //console.log(localStorage.getItem('category'))
    });
  }

}
