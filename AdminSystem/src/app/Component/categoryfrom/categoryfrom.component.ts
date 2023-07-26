import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, RangeValueAccessor, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';
import { Idata } from 'src/app/Models/idata';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoryfrom',
  templateUrl: './categoryfrom.component.html',
  styleUrls: ['./categoryfrom.component.css']
})
export class CategoryfromComponent {
  error :boolean=false;
  typeID :any;
  type :Idata ={
    "id":0,
    "name":"",
  };
  typefrom :any;
constructor (private ProductService: ProductService
  , private Router:Router,private ActivatedRoute:ActivatedRoute  , public toster:ToastrService)
{
  this.typefrom = new FormGroup ({
    Id : new FormControl(0),
    Name :new FormControl("",[Validators.required,Validators.minLength(3)]),
  })
}
ngOnInit(): void {
  this.typeID=this.ActivatedRoute.snapshot.paramMap.get('id');
  console.log(this.typeID);
  if(this.typeID !=0){
    this.ProductService.GetByIDType(this.typeID).subscribe({
      next:(response)=>{
        this.type=response;
        console.log(response);
        this.id.setValue(this.type.id);
        this.name.setValue(this.type.name);
      }
    })
  }
}
get id(){
  return this.typefrom.controls['Id'] ;
}
get name(){
  return this.typefrom.controls['Name'] ;
}

OperationONForm(){
  console.log(this.typefrom.value)
  if(this.typefrom.status=='VALID'){
    if(this.typeID==0){
    this.ProductService.AddType(this.typefrom.value).subscribe(()=>{
      this.toster.success("successfully Added")
      this.Router.navigate(['/categories'])
    });
    }
else{
      this.ProductService.EditType(this.typefrom.value).subscribe(()=>{
        this.toster.success("successfully Edited")
        this.Router.navigate(['/categories'])});
    }
    this.error=false;
  }
  else{
    this.error=true;
  }

}
}
