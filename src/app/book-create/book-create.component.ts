import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookCreateComponent implements OnInit {
 private API_URL = "https://evening-temple-66423.herokuapp.com";
 private cors_api_host = 'cors-anywhere.herokuapp.com';
    private cors_api_url = 'https://' + this.cors_api_host + '/';
  book: any = {};
  
 
  constructor(private http: Http,private router: Router) {console.log('[Bookcreatecomponent] '); }

  ngOnInit() {
  }

  saveBook() {
console.log('[Bookcreatecomponent] ');
return this.http
      .post(this.cors_api_url+this.API_URL+'/book', this.book)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  
  }
 

  

ngOnDestroy() {
    
  }
}
