import { Component, OnInit } from '@angular/core';
import { BookAuthService } from 'src/app/services/book-auth.service';
import { FormControl, FormGroup } from '@angular/forms';
// import { BookAuthService } from '../book-auth.service'
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css'],
})
export class SellComponent implements OnInit {
  title: String;
  author: String;
  publication: String;
  category: String;
  price: String;
  imgUrl: String;
  city: String;
  showSucessMessage: boolean;
  serverErrorMessage: boolean;
  form: FormGroup;
  imgData: String;
  user: any;
  productImage: any;
  citys: any;
  categorys: any;

  constructor(private book: BookAuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      author: new FormControl(null),
      publication: new FormControl(null),
      category: new FormControl(null),
      price: new FormControl(null),
      city: new FormControl(null),
    });

    this.book.getDistinctCity().subscribe((data) => (this.citys = data));
    this.book
      .getdistinctcategory()
      .subscribe((data) => (this.categorys = data));
  }

  onFileSelect(event: Event) {
    this.productImage = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: this.productImage });
    const allowedtypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (this.productImage && allowedtypes.includes(this.productImage.type)) {
      const formData = new FormData();
      formData.append('productImage', this.productImage);

      this.book.upload(formData).subscribe(
        (res: any) => {
          this.imgUrl = res.imgUrl;
          console.log(this.imgUrl);
        },
        (err) => {
          if (err.status == 400) {
            this.serverErrorMessage = err.error.join('<br/>');
          }
        }
      );
    }
  }
  onSubmit() {
    const data = {
      title: this.title,
      author: this.author,
      publication: this.publication,
      category: this.category,
      price: this.price,
      imgUrl: this.imgUrl,
      city: this.city,
      user: localStorage.getItem('user'),
    };

    //formData.append('title', new String(this.title));

    console.log(data);
    console.log(this.imgUrl);
    this.book.sell(data).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
      },
      (err) => {
        if (err.status == 400) {
          this.serverErrorMessage = err.error.join('<br/>');
        }
      }
    );

    console.log(data);
  }
}
