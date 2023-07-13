import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/Model/iproduct';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?:Iproduct;
 constructor(
  private breadCrumb:BreadcrumbService,
  private shopService:ShopService 
  , private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe({
      next: product=>{
        this.product=product;
        this.breadCrumb.set('@productDeatails',product.name)
      
      },
      error:error=>console.log(error)
      
    })
  }


}
