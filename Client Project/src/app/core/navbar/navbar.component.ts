import { Component, OnInit, Renderer2 } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { basketItem } from 'src/app/shared/Model/basket';
import { AccountModule } from 'src/app/account/account.module';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  prevScrollpos = window.pageYOffset;
  navbarVisible = true;
  


  constructor(public basketService:BasketService,public accountService:AccountService)  { }
  getCount(items:basketItem[])
  {
    
     return items.reduce((sum,item)=>sum+item.quantity,0)
  }
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav');
      if(navbar){
        const currentScrollPos = window.pageYOffset;
      if (this.prevScrollpos > currentScrollPos) {
        navbar.style.marginTop = '-27px';
      }
      else{
        navbar.style.marginTop = '-27px';
      }
      if (currentScrollPos === 0) {
        navbar.style.marginTop = '0px'; 
        
      }
      this.prevScrollpos = currentScrollPos;
      }
    });
}


}

