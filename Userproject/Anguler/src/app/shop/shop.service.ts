import { ShopParams } from './../shared/Model/shopParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ipagination } from '../shared/Model/ipagination';
import { Iproduct } from '../shared/Model/iproduct';
import { Ibrand } from '../shared/Model/ibrands';
import { Itypes } from '../shared/Model/itypes';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl:string = "http://localhost:5180/api/";
  constructor(private Http:HttpClient) {
  }

  getproducts(shopParams:ShopParams):Observable<Ipagination <Iproduct[]>>
  {
    debugger
    let params = new HttpParams();
    if(shopParams.brandId) params=params.append("brandId",shopParams.brandId);
    if(shopParams.typeId) params=params.append("typeId",shopParams.typeId);
    params=params.append("sort",shopParams.sort);
    params=params.append("PageIndex",shopParams.pageNumber)
    params=params.append("pageSize",shopParams.pageSize)
    if(shopParams.search)params=params.append('search',shopParams.search)
    return this.Http.get<Ipagination <Iproduct[]>>(this.baseUrl+'product',{params:params})
  }

  // getproducts():Observable<Ipagination <Iproduct[]>>
  // {
  //   return this.Http.get<Ipagination <Iproduct[]>>(this.baseUrl+'product?pageSize=50')
  // }
  getProduct(id:number){
    return this.Http.get<Iproduct>(this.baseUrl+'product/'+id);
  }
  getBrands(){
    return this.Http.get<Ibrand[]>(this.baseUrl+'product/brands')
  }

  getTypes(){
    return this.Http.get<Itypes[]>(this.baseUrl+'product/types')
  }
}
