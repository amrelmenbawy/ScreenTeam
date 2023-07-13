import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClienProject';
  // products:any[]=[];
  // constructor(private http:HttpClient){

  // }
  // ngOnInit(): void {
  //   this.http.get("http://localhost:5180/api/product?pageSize=50").subscribe({
  //     next:(response:any)=>this.products=response.data,
  //     error:error=>console.log(error),
  //     complete:()=>{
  //       console.log("complete")
  //       console.log("extra")
  //     }
      
  //   })
  // }
}
