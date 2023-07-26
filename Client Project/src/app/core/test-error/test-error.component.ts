import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  baseUrl =  environment.apiUrl;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    
  }

  get404Error(){
    this.http.get(this.baseUrl+'product/5000').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get500Error(){
    this.http.get(this.baseUrl+'buggy/servererror').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get400Error(){
    this.http.get(this.baseUrl+'buggy/badrequest').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get400ValidationError(){
    this.http.get(this.baseUrl+'product/fourtythree').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

}
