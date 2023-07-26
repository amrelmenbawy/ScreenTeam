import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Iproduct } from 'src/app/shared/Model/iproduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {
  
@Input()product?:Iproduct;
constructor(private basketService:BasketService){}

addItemToBasket(){
 this.product && this.basketService.addItemToBasket(this.product)
}
}
