import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Idata } from 'src/app/Models/idata';
import { Iproduct } from 'src/app/Models/iproduct';
import { IproductSend } from 'src/app/Models/iproduct-send';
import { ProductService } from 'src/app/Services/product.service';
@Component({
  selector: 'app-productfrom',
  templateUrl: './productfrom.component.html',
  styleUrls: ['./productfrom.component.css']
})
export class ProductfromComponent {
  error :boolean=false;
  productID :any;
  product :IproductSend|any;
  types : Idata[] =[];
  brands : Idata[] =[];
  file:any;
constructor(private ProductService:ProductService,private router:Router ,private ActivatedRoute:ActivatedRoute ,public toster :ToastrService){
}
ngOnInit(): void {
  this.productID=this.ActivatedRoute.snapshot.paramMap.get('id');
  this.ProductService.GetAllTypes().subscribe((response)=>this.types= response);
  this.ProductService.GetAllBrands().subscribe((response)=>this.brands= response);
  console.log(this.productID);
  if(this.productID !=0){
    this.ProductService.GetByIDProductWithBrandandtypeWithIDs(this.productID).subscribe({
      next:(response)=>{
        this.product=response;
        this.getid.setValue(this.product.id);
        this.getname.setValue(this.product.name);
        this.getdescription.setValue(this.product.description);
        this.getimgUrl.setValue(this.product.imgUrl);
        this.getprice.setValue(this.product.price);
        this.getproductTypeId.setValue(this.product.productTypeId);
        this.getproductBrandId.setValue(this.product.productBrandId);
      }
    })
  }
}
productfrom = new FormGroup ({
  id : new FormControl(0),
  name : new FormControl("",[Validators.required,Validators.minLength(3)]),
  description : new FormControl("",[Validators.required,Validators.minLength(20)]),
  price : new FormControl("",[Validators.required]),
  imgUrl :new FormControl("default.PNG",[Validators.required]),
  productTypeId :new FormControl(0,[Validators.required,Validators.min(1)]),
  productBrandId :new FormControl(0,[Validators.required,Validators.min(1)]),
 // imageFile: new FormControl ("",[Validators.required])
  imageFile: new FormControl ("")
})

get getid(){
  return this.productfrom.controls['id'] ;
}
get getname(){
  return this.productfrom.controls['name'] ;
}
get getdescription(){
  return this.productfrom.controls['description'] ;
}
get getprice(){
  return this.productfrom.controls['price'] ;
}
get getimgUrl(){
  return this.productfrom.controls['imgUrl'] ;
}
get getproductTypeId(){
  return this.productfrom.controls['productTypeId'] ;
}
get getproductBrandId(){
  return this.productfrom.controls['productBrandId'] ;
}
get getimageFile(){
  return this.productfrom.controls['imageFile'] ;
}
getfile(event:any){
  this.file =event.target.files[0];
}
OperationONForm(e:any){
  e.preventDefault();
  console.log(this.productfrom.value)
  if(this.productfrom.status=='VALID'){
    const formData = new FormData();
    const id:any = this.productfrom.get('id')?.value;
    const name:any = this.productfrom.get('name')?.value;
    const description:any = this.productfrom.get('description')?.value;
    const price:any = this.productfrom.get('price')?.value;
    const imgUrl:any = this.productfrom.get('imgUrl')?.value;
    const productTypeId:any = this.productfrom.get('productTypeId')?.value;
    const productBrandId:any = this.productfrom.get('productBrandId')?.value;
    formData.append('ID', id);
    formData.append('Name',name);
    formData.append('Description', description);
    formData.append('Price',price);
    formData.append('imgUrl',imgUrl);
    formData.append('ProductBrandId',productBrandId);
    formData.append('productTypeId',productTypeId);
    formData.append('imageFile', this.file);
    if(this.productID==0){
    this.ProductService.Add(formData).subscribe(()=> {
      this.toster.success("successfully Added")
      this.router.navigate(['/Products'])});
    }
    else{

      this.ProductService.Edit(formData).subscribe(()=>{
        this.toster.success("successfully Edited")
        this.router.navigate(['/Products'])
      })

    }
    this.error=false;
  }
  else{
    this.error=true;
  }

}
}
