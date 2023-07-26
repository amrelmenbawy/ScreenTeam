import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop.service';
import { Iproduct } from 'src/app/shared/Model/iproduct';
import { Itypes } from 'src/app/shared/Model/itypes';
import { Ibrand } from 'src/app/shared/Model/ibrands';
import { ShopParams } from 'src/app/shared/Model/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @ViewChild('search')searchTerms?:ElementRef;
  
    products :Iproduct[]=[];
    types :Itypes[]=[];
    brands :Ibrand[]=[];
    shopParams= new ShopParams();
    totalCount=0;
    sortOptions=[
      {
        name:'Alphabetical',
        value:'name'
      },
      {
        name:'Price : Low to high',
        value:'priceAsc'
      },
      {
        name:'Price : High to low',
        value:'priceDesc'
      }
    ]
    constructor(private ShopService:ShopService)
    {
    }
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    

  }
  onSearch(){
    this.shopParams.search=this.searchTerms?.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onReset(){
    if  (this.searchTerms)this.searchTerms.nativeElement.value="";
    this.shopParams =new ShopParams();
    this.getProducts();
  }
  
  onPageChanged(e:any){
    if(this.shopParams.pageNumber!==e.page)
    {
      this.shopParams.pageNumber=e.page
      this.getProducts();
    }
    
  }
  onSortSelected(e:any){
   this.shopParams.sort=e.target.value;
   this.getProducts();
  }
  onBrandSelected(brandId:number){
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts()
  }
  onTypeSelected(typeId:number){
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts()
  }
getProducts(){
  this.ShopService.getproducts(this.shopParams).subscribe(
    {
      next: respons=> {   
        this.products = respons.data
        this.shopParams.pageNumber=respons.pageIndex;
        this.shopParams.pageSize=respons.pageSize;
        this.totalCount=respons.count
      }, 
      error:error=>console.log(error)
    }
  )
}
getBrands(){
  this.ShopService.getBrands().subscribe(
    {
      next: respons=> this.brands = [{id:0,name:'All'},...respons], 
      error:error=>console.log(error)
    }
  )
}

getTypes(){
  this.ShopService.getTypes().subscribe(
    {
      next: respons=> this.types =[{id:0,name:'All'},...respons] , 
      error:error=>console.log(error)
    }
  )
}

}
