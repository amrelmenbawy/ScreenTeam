import { DeliveryMethod } from "./deliveryMethod";
import { Address } from "./user";

export interface OrderToCreate 
{
    BasketId:string;
    deliveryMethodId:number;
    shipToAddress:Address
}

export interface Order 
{
    id:number;
    buyerEmail:string;
    orderDate: string;
    subtotal:number;
    deliveryMethod: string;
    shipToAddress:Address;
    orderItems:OrderItem[];
    status:number;
    paymentIntentId:string;
    shippingPrice:number;
    total:number;
}

export interface OrderItem
{
    id:number;
    price:number;
    quantity:number;
    productName:string;
    imgUrl:string;
}