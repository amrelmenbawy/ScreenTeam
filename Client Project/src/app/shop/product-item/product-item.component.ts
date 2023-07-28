import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Iproduct } from 'src/app/shared/Model/iproduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {

@Input()product?:Iproduct;
constructor(private basketService:BasketService, public toster:ToastrService){}

addItemToBasket(){
 this.product && this.basketService.addItemToBasket(this.product)
 this.toster.success(`Added this Item ${this.product?.name} To your Basket ` )
}
}
