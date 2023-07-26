import * as cuid from "cuid";
export interface basketItem{
    id:number;
    productName:string;
    price:number;
    quantity:number;
    imgUrl:string;
    brand:string;
    types:string;
   
}
export interface Basket{
    id:string;
    item:basketItem[];
    clientSecret?:string;
    paymentIntentId?:string;
    deliveryMethodId?:number;
    shippingPrice:number;

}
export class Basket implements Basket{
    id=cuid();
    item: basketItem[]=[];
    shippingPrice=0;
    
}
export interface BasketTotals{
    shipping:number,
    subtotal:number,
    total:number
}