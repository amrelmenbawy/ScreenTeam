import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ideliverymethod } from 'src/app/Models/ideliverymethod';
import { DeliverymethodService } from 'src/app/Services/deliverymethod.service';

@Component({
  selector: 'app-delivery-from',
  templateUrl: './delivery-from.component.html',
  styleUrls: ['./delivery-from.component.css']
})
export class DeliveryFromComponent {
  error :boolean=false;
  deliveryID :any;
  deliveryfrom :any;
  delivery : Ideliverymethod |any ; 
constructor (private deliverymethodService: DeliverymethodService
  , private Router:Router,private ActivatedRoute:ActivatedRoute  , public toster:ToastrService)
{
  this.deliveryfrom = new FormGroup ({
    id : new FormControl(0),  
    shortName :new FormControl("",[Validators.required,Validators.minLength(3)]),
    deliveryTime: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    price: new FormControl("",[Validators.required]),
  })
}
ngOnInit(): void {
  this.deliveryID=this.ActivatedRoute.snapshot.paramMap.get('id');
  if(this.deliveryID !=0){
    this.deliverymethodService.GetByID(this.deliveryID).subscribe({
      next:(response)=>{
        this.delivery=response;
        console.log(response);
        this.id.setValue(this.delivery.id);
        this.shortName.setValue(this.delivery.shortName);
        this.deliveryTime.setValue(this.delivery.deliveryTime);
        this.description.setValue(this.delivery.description);
        this.price.setValue(this.delivery.price);
      }
    })
  }
}
get id(){
  return this.deliveryfrom.controls['id'] ;
}
get shortName(){
  return this.deliveryfrom.controls['shortName'] ;
}
get deliveryTime(){
  return this.deliveryfrom.controls['deliveryTime'] ;
}
get description(){
  return this.deliveryfrom.controls['description'] ;
}
get price(){
  return this.deliveryfrom.controls['price'] ;
}

OperationONForm(){
  console.log(this.deliveryfrom.value)
  if(this.deliveryfrom.status=='VALID'){
    if(this.deliveryID==0){
    this.deliverymethodService.Add(this.deliveryfrom.value).subscribe(()=>{
      this.toster.success("successfully Added")
      this.Router.navigate(['/DeliveryMethod'])
    });
    }
else{
      this.deliverymethodService.Edit(this.deliveryfrom.value).subscribe(()=>{
        this.toster.success("successfully Edited")
        this.Router.navigate(['/DeliveryMethod'])});
    }
    this.error=false;
  }
  else{
    this.error=true;
  }

}
}
