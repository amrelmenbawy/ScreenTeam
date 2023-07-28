import { Itypes } from './../../shared/Model/itypes';
import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { basketItem } from 'src/app/shared/Model/basket';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

token = localStorage.getItem('token');
constructor(public basketService:BasketService,public toster :ToastrService ){}

incremintQuantity(item:basketItem){
this.basketService.addItemToBasket(item)
this.toster.success("Added")
}
removeItem(event:{id:number,quantity:number}){
this.basketService.removeItemFromBasket(event.id,event.quantity),
this.toster.success("Removed")
}

}
