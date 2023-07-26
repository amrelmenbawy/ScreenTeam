import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { basketItem } from '../Model/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit{
 @Output() addItem = new EventEmitter<basketItem>();
 @Output() removeItem = new EventEmitter<{id:number,quantity:number}>();
 
 @Input() isBasket= true;
 
 constructor(public basketService:BasketService) { }
  
  ngOnInit(): void {
  }

  addBasketItem(item:basketItem)
  {
    this.addItem.emit(item);
  }

  removeBasketItem(id:number,quantity=1)
  {
    this.removeItem.emit({id,quantity});
  }



}
