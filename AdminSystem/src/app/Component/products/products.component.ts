import { MatDialog } from '@angular/material/dialog';
import { ProductParams } from './../../Models/Product-params';
import { ProductService } from 'src/app/Services/product.service';
import { Iproduct } from './../../Models/iproduct';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Idata } from 'src/app/Models/idata';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
data:Iproduct[]=[];
types :Idata[]=[];
brands :Idata[]=[];

totalCount=0;
ProductParams= new ProductParams();
@ViewChild('search')searchTerms?:ElementRef;


constructor(private productService:ProductService , public toster : ToastrService, public dialog: MatDialog )
{
}
ngOnInit(): void {
  this.getProducts();
  this.getBrands();
  this.getTypes();

}

onSearch(){
  this.ProductParams.search=this.searchTerms?.nativeElement.value;
  this.ProductParams.pageNumber=1;
  this.getProducts();
}

onReset(){
  if  (this.searchTerms)this.searchTerms.nativeElement.value="";
  this.ProductParams =new ProductParams();
  this.getProducts();
}

onPageChanged(e:any){
  console.log(e.page);
  if(this.ProductParams.pageNumber!==e.page){
    this.ProductParams.pageNumber=e.page
  }
  this.getProducts();
}
getProducts(){
  this.productService.getproducts(this.ProductParams).subscribe({
    next:(response) => {
      this.data = response.data
      this.ProductParams.pageNumber = response.pageIndex;
      this.ProductParams.pageSize=response.pageSize;
      this.totalCount=response.count;
    },
    error : (error)=> console.log("Error"+JSON.stringify(error)),
  })
}
openConfirmationDialogDelete(productID :any): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '350px',
    data: 'Are you sure you want to delete this product '
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.delete(productID)
  }
});
}

delete(productID :any){
  this.productService.Delete(productID).subscribe(
    ()=>{
      this.toster.success("Successfully Deleted")
      this.ngOnInit()}
  )

}

onBrandSelected(brandId:any){
  this.ProductParams.brandId=brandId.target.value;
  this.ProductParams.pageNumber=1;
  this.getProducts();
}
onTypeSelected(typeId:any){
  this.ProductParams.typeId=typeId.target.value;
  console.log(this.ProductParams.typeId);
  this.ProductParams.pageNumber=1;
  this.getProducts();
}

getBrands(){
  this.productService.GetAllBrands().subscribe(
    {
      next: respons=> this.brands = [{id:0,name:'All'},...respons],
      error:error=>console.log(error),
    }
  )
}

getTypes(){
  this.productService.GetAllTypes().subscribe(
    {
      next: respons=> this.types =[{id:0,name:'All'},...respons] ,
      error:error=>console.log(error)

    }
  )
}
}
