import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Iorder } from '../Models/iorder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl:string ;
  httpOptions={}; // Header
  token:string|null;
  constructor(private http :HttpClient , private Router:Router ) {
    this.baseUrl="http://localhost:5180/api/Order/AllOrders";
    this.token=localStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:`Bearer ${this.token}`
      })
    };
  }
  
  GetAll():Observable<Iorder[]> {
    return this.http.get<Iorder[]>(this.baseUrl,this.httpOptions);
  }


}
