
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketTotals, basketItem } from '../shared/Model/basket';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from '../shared/Model/iproduct';
import { DeliveryMethod } from '../shared/Model/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
baseUrl=environment.apiUrl;
private basketSource = new BehaviorSubject<Basket|null>(null);
basketSource$ =this.basketSource.asObservable()
private basketTotalSource =new BehaviorSubject<BasketTotals|null>(null)
basketTotalSource$=this.basketTotalSource.asObservable()


  constructor(private http:HttpClient) { 

  }

  getBasket(id:string){
    return this.http.get<Basket>(this.baseUrl+'basket?id='+id).subscribe({
      next: basket=>{
        this.basketSource.next(basket);
        this.calculateTotals()
      }
    })
  }

private isProduct(item:Iproduct|basketItem): item is Iproduct{
  return (item as Iproduct).productBrand!==undefined
}

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const subtotal =basket.item.reduce((a,b)=>(b.price*b.quantity)+a,0)
    const total=subtotal+basket.shippingPrice;
    this.basketTotalSource.next({shipping:basket.shippingPrice,total,subtotal})
  }

  setBasket(basket:Basket){
    
   return this.http.post<Basket>(this.baseUrl+'Basket',basket).subscribe({
    next:basket=>{
      this.basketSource.next(basket);
      this.calculateTotals()
    }
   })
  }

  getCurrentBasketValue(){
   return this.basketSource.value;
  }

 private mapProductItemToBasketItem(item:Iproduct){
  return {
    id:item.id,
    productName:item.name,
    price:item.price,
    quantity:0,
    imgUrl:item.imgUrl,
    brand:item.productBrand,
    types:item.productType
  }
  }


  createBasket():Basket{
  const basket = new Basket();
  localStorage.setItem("basket_id",basket.id)
  return basket;
  }


  addItemToBasket(item:Iproduct|basketItem,quantity=1){
    if(this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    const basket=this.getCurrentBasketValue() ?? this.createBasket();
    basket.item=this.addOrUpdateItem(basket.item,item,quantity)
    this.setBasket(basket);
  }
  deleteBasket(basket:Basket){
  return this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe({
    next:()=>{
     this.deleteLocalBasket();
    }
  })
  }

  deleteLocalBasket()
  {
    this.basketSource.next(null)
    this.basketTotalSource.next(null)
    localStorage.removeItem("basket_id");
  }

removeItemFromBasket(id:number,quantity=1){
const basket= this.getCurrentBasketValue()
if(!basket) return;
const item =basket.item.find(x=>x.id===id);
if(item){
  item.quantity-=quantity;
  if(item.quantity===0){
    basket.item=basket.item.filter(x=>x.id!==id)
  }
  if(basket.item.length>0)this.setBasket(basket);
  else{
    this.deleteBasket(basket);
  }
}
}

 addOrUpdateItem(items:basketItem[] ,itemToAdd:basketItem,quantity:number):basketItem[]{
    const item = items.find(x=>x.id===itemToAdd.id);
    if(item) item.quantity+=quantity;
    else{
      itemToAdd.quantity=quantity;
      items.push(itemToAdd)
    }
    return items
 }

 setShippingPrice(deliveryMethod:DeliveryMethod)
 {
  const basket =this.getCurrentBasketValue();
  if(basket)
  {
    basket.deliveryMethodId=deliveryMethod.id;
    basket.shippingPrice=deliveryMethod.price;
    this.setBasket(basket);
  }
 }

  createPaymentIntent()
  {
    return this.http.post<Basket>(this.baseUrl+'payments/'+this.getCurrentBasketValue()?.id,{}).pipe(
      map(basket=>{
        this.basketSource.next(basket);
      })
    )
  }

}
