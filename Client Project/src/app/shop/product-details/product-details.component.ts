import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/Model/iproduct';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  showModal = false;

  product?:Iproduct;
  quantity=1;
  quantityInBasket=0;
 constructor(
  private basketService:BasketService
  ,private breadCrumb:BreadcrumbService,
  private shopService:ShopService
  , private activatedRoute:ActivatedRoute,
  public toster : ToastrService){}
  ngOnInit(): void {
    this.loadProduct()
  }
  incremintQuantity(){
    this.quantity++;
  }
  decremintQuantity(){
    if(this.quantity>0){
    this.quantity--;
    }
  }
  updateBasket(){
    if(this.product){
      if(this.quantity>this.quantityInBasket)
      {
        const itemToAdd=this.quantity-this.quantityInBasket;
        this.quantityInBasket+=itemToAdd;
        this.basketService.addItemToBasket(this.product,itemToAdd)
        this.toster.success("Added")

      }
      else{
        const itemsToRemove =this.quantityInBasket-this.quantity
        this.quantityInBasket-=itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id,itemsToRemove)
        this.toster.success("Removed")

      }
    }
  }
  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe({
      next: product=>{
        this.product=product;
        this.breadCrumb.set('@productDeatails',product.name)
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next:basket=>{
            const item = basket?.item.find(x=>x.id===+id)
            if(item){
              this.quantity=item.quantity
              this.quantityInBasket=item.quantity
            }
          }
        })

      },
      error:error=>console.log(error)

    })
  }


  get buttonText(){
    return this.quantityInBasket===0?'Add to basket':'Update Basket'
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
