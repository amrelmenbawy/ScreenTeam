import { Component, Input } from '@angular/core';
import { Iproduct } from 'src/app/shared/Model/iproduct';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent {
  
@Input()product?:Iproduct;



}
