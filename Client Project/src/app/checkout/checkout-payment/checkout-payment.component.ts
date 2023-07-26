import { OrderToCreate } from './../../shared/Model/order';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/Model/basket';
import { Address } from 'src/app/shared/Model/user';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit{
   @Input() checkoutForm?:FormGroup;
   @ViewChild('cardNumber') cardNumberElement?:ElementRef;
   @ViewChild('cardExpiry') cardExpiryElement?:ElementRef;
   @ViewChild('cardCvc') cardCvcElement?:ElementRef;

   stripe:Stripe|null=null;
   cardNumber?:StripeCardNumberElement;
   cardExpiry?:StripeCardExpiryElement;
   cardCvc?:StripeCardCvcElement;

   cardErrors:any;

   constructor(private toastr:ToastrService,
    private checkoutService:CheckoutService,
    private basketService:BasketService,
    private router:Router) 
   { }
  ngOnInit(): void {
    loadStripe('pk_test_51NTnCCCpzUeorpkGFn32izbb862rqi1sNSSG604n0FcfQNPMM8wb1QxaxmzP80bOPqDbfuhZkuXJfs3h46A87jDe00NvJCe4bg').then(stripe=>{
      this.stripe=stripe;
      const elements=stripe?.elements();
      if(elements)
      {
        this.cardNumber=elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement);
        this.cardNumber.on('change',event=>{
          if(event.error)this.cardErrors=event.error.message
          else this.cardErrors=null;
        })

        this.cardExpiry=elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
        this.cardExpiry.on('change',event=>{
          if(event.error)this.cardErrors=event.error.message
          else this.cardErrors=null;
        })

        this.cardCvc=elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement);
        this.cardCvc.on('change',event=>{
          if(event.error)this.cardErrors=event.error.message
          else this.cardErrors=null;
        })
      }
    })
  }

 async submitOrder()
  {
    const basket=this.basketService.getCurrentBasketValue();
    if(!basket) throw new Error('cannot get the basket');

    try{
       const createOrder=await this.createOrder(basket); 
       const paymentResult= await this.confirmPaymentWithStripe(basket);
       if(paymentResult.paymentIntent)
       {
        this.basketService.deleteBasket(basket);
        const NavigationExtras:NavigationExtras = {state:createOrder};
        this.router.navigate(['checkout/success'],NavigationExtras);
       }
       else{
        this.toastr.error(paymentResult.error.message)
       }
    } 
    catch(error:any){
     this.toastr.error(error.message);
    }

    // if(!basket) return;
    // const OrderToCreate = this.getOrderToCreate(basket);

    // if(!OrderToCreate) return;

    // this.checkoutService.createOrder(OrderToCreate).subscribe({
    //   next:order=>{
    //     this.toastr.success('order created successfully');
    //     this.stripe?.confirmCardPayment(basket.clientSecret!,{
    //       payment_method:{
    //         card:this.cardNumber!,
    //         billing_details:{
    //           name:this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
    //         }
    //       }
    //     }).then(result=>{
    //       console.log(result)
    //       if(result.paymentIntent)
    //       {
    //         this.basketService.deleteLocalBasket();
    //         const navigationExtras:NavigationExtras ={state:order};
    //         this.router.navigate(['checkout/success'],navigationExtras);
    //       }
    //       else{
    //         this.toastr.error(result.error.message)
    //       }
    //     })
    //   }
    // })
  }

  confirmPaymentWithStripe(basket: Basket | null) {
    if(!basket) throw new Error('basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!,{
      payment_method:{
        card:this.cardNumber!,
        billing_details:{
          name:this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if(!result)
    {
      throw new Error('Error Attempting payment with stripe');
    }
    return result;
  }

  private async createOrder(basket: Basket | null) {
   if(!basket) throw new Error('basket is null');
   const OrderToCreate=this.getOrderToCreate(basket);
   return firstValueFrom(this.checkoutService.createOrder(OrderToCreate));
  }

   private getOrderToCreate(basket:Basket):OrderToCreate
   {
      const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
      const shippToAddress = this.checkoutForm?.get('addressForm')?.value as Address;

      if(!deliveryMethodId || !shippToAddress) throw new Error('Problem with basket');

      return{
        BasketId:basket.id,
        deliveryMethodId:deliveryMethodId,
        shipToAddress:shippToAddress
      }
   }
}
