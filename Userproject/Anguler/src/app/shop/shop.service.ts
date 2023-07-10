import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ipagination } from '../shared/Model/ipagination';
import { Iproduct } from '../shared/Model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl:string = "http://localhost:5180/api/Product";
  constructor(private Http:HttpClient) {
  }

  getproducts():Observable<Ipagination <Iproduct[]>>
  {
    return this.Http.get<Ipagination <Iproduct[]>>(this.baseUrl)
  }
}
