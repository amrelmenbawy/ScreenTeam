import { AccountService } from './account/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Iproduct } from './shared/Model/iproduct';
import { Ipagination } from './shared/Model/ipagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClienProject';
  products:Iproduct[]=[];
   constructor(private http:HttpClient ,private basketService:BasketService,private accountService:AccountService){

   }
  ngOnInit(): void {
    this.http.get<Ipagination<Iproduct[]>>("http://localhost:5180/api/product?pageSize=50").subscribe({
      next: response =>this.products = response.data,
      error:error=>console.log(error),
      complete:()=>{
        console.log("complete")
        console.log("extra")
      }
    })

    const basketId= localStorage.getItem("basket_id");
    if(basketId) this.basketService.getBasket(basketId);

    this.loadCurrentUser();

  }

  loadCurrentUser()
  {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
    }
}
