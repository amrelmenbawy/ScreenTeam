import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/Model/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit{

  order?:Order;
  constructor(private router:Router) {
     const navigation = this.router.getCurrentNavigation();
     this.order=navigation?.extras?.state as Order
   }
  
  ngOnInit(): void {
    
  }

}
