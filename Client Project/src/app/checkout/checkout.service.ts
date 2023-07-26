import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeliveryMethod } from '../shared/Model/deliveryMethod';
import { map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/Model/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl=environment.apiUrl;

  // httpOptions={};
  // token:string|null;
  // constructor(private http :HttpClient ) {
  // this.token=localStorage.getItem("token");
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       Authorization:`Bearer  ${this.token}`
  //     })
  //   };
  // }
  constructor(private http :HttpClient ) { }

  getDeliveryMethods()
  {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'Order/deliveryMethods').pipe(
      map(dm=>{
        return dm.sort((a,b)=>b.price -a.price)
      })
    )
  }

  createOrder(order:OrderToCreate)
  {
    return this.http.post<Order>(this.baseUrl+'order',order);
  }
}
