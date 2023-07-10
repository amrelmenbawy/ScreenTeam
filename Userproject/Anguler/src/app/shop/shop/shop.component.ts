import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/Model/iproduct';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    products :Iproduct[]=[];
    constructor(private ShopService:ShopService)
    {
    }
  ngOnInit(): void {
    this.ShopService.getproducts().subscribe(
      {
        next: respons=> this.products = respons.data 
        

      }
    )

  }



}
