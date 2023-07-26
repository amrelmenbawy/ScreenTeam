import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit{
  @Input() checkoutForm?:FormGroup;

  constructor(private accountService:AccountService,private toastr:ToastrService) { }
  ngOnInit(): void {
   
  }
  
  saveUserAddress()
  {
    this.accountService.updateAddress(this.checkoutForm?.get('addressForm')?.value).subscribe({
      next:()=>{
        this.toastr.success('Address Saved');
        this.checkoutForm?.get('addressForm')?.reset(this.checkoutForm?.get('addressForm')?.value)
      }
    })
  }
}
