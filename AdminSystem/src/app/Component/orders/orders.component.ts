import { Iorder } from 'src/app/Models/iorder';
import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { IorderItems } from 'src/app/Models/iorder-items';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders : Iorder[] =[];
  constructor(private orderService:OrderService){

  }
  ngOnInit(): void {
    this.orderService.GetAll().subscribe(res =>{
      this.orders=res


    })
  }
}
