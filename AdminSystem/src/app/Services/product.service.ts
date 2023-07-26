import { Router } from '@angular/router';
import { Idata } from './../Models/idata';
import { HttpClient ,HttpHeaders ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, map } from 'rxjs';
import { Iproduct } from '../Models/iproduct';
import { Ipagination } from '../Models/ipagination';
import { ProductParams } from '../Models/Product-params';
import { IproductSend } from '../Models/iproduct-send';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string ;
  httpOptions={}; // Header
  httpOptionsfromdata={}; // Header
  token:string|null;
  constructor(private http :HttpClient , private Router:Router ) {
    this.baseUrl="http://localhost:5180/api/Product/";
    this.token=localStorage.getItem("token");
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization:`Bearer ${this.token}`
      })
    };
    this.httpOptionsfromdata = {
      headers: new HttpHeaders({
        Authorization:`Bearer ${this.token}`
      })
    };
  }

  //multipart/form-data
  //------------------------------------------------------------------
  // Types CUDE
  GetAllTypes():Observable<Idata[]> {
    return this.http.get<Idata[]>(this.baseUrl+'types');
  }
  //
  AddType(type:Idata){
    return this.http.post(this.baseUrl+'Category',type,this.httpOptions);
  }
  EditType(type:Idata){
    return this.http.put(this.baseUrl+'Category',type, this.httpOptions)
  }
  GetByIDType(Id:number):Observable<Idata>{
      return this.http.get<Idata>(`${this.baseUrl}type/${Id}`);
    }
  DeleteType(Id:number){
      return this.http.delete(`${this.baseUrl}Category/${Id}`, this.httpOptions);
    }
  //------------------------------------------------------------------
  // Brand  CUDE
  GetAllBrands():Observable<Idata[]> {
    return this.http.get<Idata[]>(this.baseUrl+'brands');
  }
  AddBrand(brand:any){
    return this.http.post(this.baseUrl+'Brand',brand, this.httpOptions);
  }
  EditBrand(brand:any){
    return this.http.put(this.baseUrl+'Brand',brand, this.httpOptions);
  }
  GetByIDbrand(Id:number):Observable<Idata>{
    return this.http.get<Idata>(`${this.baseUrl}brand/${Id}`);
  }
  Deletebrand(Id:number){
    return this.http.delete(`${this.baseUrl}Brand/${Id}`, this.httpOptions);
  }
  //-------------------------------------------------------------------
  // Product  CUDE

  getproducts(productParams:ProductParams):Observable<Ipagination <Iproduct[]>>
  {
    let params = new HttpParams();
    if(productParams.brandId) params=params.append("brandId",productParams.brandId);
    if(productParams.typeId) params=params.append("typeId",productParams.typeId);
    params=params.append("sort",productParams.sort);
    params=params.append("PageIndex",productParams.pageNumber)
    params=params.append("pageSize",productParams.pageSize)
    if(productParams.search)params=params.append('search',productParams.search)
    return this.http.get<Ipagination <Iproduct[]>>(this.baseUrl,{params:params})
  }
  GetByID(Id:number):Observable<Iproduct>{
    return this.http.get<Iproduct>(`${this.baseUrl}${Id}`);
  }
  GetByIDProductWithBrandandtypeWithIDs(Id:number):Observable<IproductSend>{
    return this.http.get<IproductSend>(`${this.baseUrl}ProductWithBrandandtypeWithIDs/${Id}`);
  }
  Add(prouduct:any){
    return this.http.post(`${this.baseUrl}`,prouduct,this.httpOptionsfromdata);
  }
  Edit(prouduct:any){
    return this.http.put(`${this.baseUrl}`,prouduct, this.httpOptionsfromdata);
  }

 Delete(Id:number){
    return this.http.delete(`${this.baseUrl}${Id}`,  this.httpOptions);
  }

}
