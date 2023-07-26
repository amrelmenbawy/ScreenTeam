import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ideliverymethod } from '../Models/ideliverymethod';

@Injectable({
  providedIn: 'root'
})
export class DeliverymethodService {
  baseUrl:string ;
  httpOptions={}; // Header
  token:string|null;
  constructor(private http :HttpClient , private Router:Router ) {
    this.baseUrl="http://localhost:5180/api/deliveryMethod";
    this.token=localStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:`Bearer ${this.token}`
      })
    };
  }

  GetAll():Observable<Ideliverymethod[]> {
    return this.http.get<Ideliverymethod[]>(this.baseUrl,this.httpOptions);
  }
  Add(DM:any){
    return this.http.post(this.baseUrl,DM, this.httpOptions);
  }
  Edit(DM:any){
    return this.http.put(this.baseUrl,DM, this.httpOptions);
  }
  GetByID(Id:number):Observable<Ideliverymethod>{
    return this.http.get<Ideliverymethod>(`${this.baseUrl}/${Id}`,this.httpOptions);
  }
  Delete(Id:number){
    return this.http.delete(`${this.baseUrl}/${Id}`, this.httpOptions);
  }
}
