import { Itypes } from './../../shared/Model/itypes';
import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { basketItem } from 'src/app/shared/Model/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

token = localStorage.getItem('token');  
constructor(public basketService:BasketService){}

incremintQuantity(item:basketItem){
this.basketService.addItemToBasket(item)
}
removeItem(event:{id:number,quantity:number}){
this.basketService.removeItemFromBasket(event.id,event.quantity)
}

}
