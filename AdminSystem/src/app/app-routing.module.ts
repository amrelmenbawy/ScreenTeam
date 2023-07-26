import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Component/products/products.component';
import { LoginComponent } from './Component/login/login.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { ProductfromComponent } from './Component/productfrom/productfrom.component';
import { CategoryfromComponent } from './Component/categoryfrom/categoryfrom.component';
import { BrandsComponent } from './Component/brands/brands.component';
import { BrandfromComponent } from './Component/brandfrom/brandfrom.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { authGuard } from './Gaurds/auth.guard';
import { OrdersComponent } from './Component/orders/orders.component';
import { DeliveryMethodComponent } from './Component/delivery-method/delivery-method.component';
import { DeliveryFromComponent } from './Component/delivery-from/delivery-from.component';

const routes: Routes = [
  {path: '', redirectTo: '/Products', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'Products',component:ProductsComponent, canActivate: [authGuard]},
  {path:'categories',component:CategoriesComponent , canActivate: [authGuard] },
  {path:'brands',component:BrandsComponent, canActivate: [authGuard]},
  {path:'Product/edit/:id',component:ProductfromComponent , canActivate: [authGuard] },
  {path:'category/edit/:id',component:CategoryfromComponent , canActivate: [authGuard] },
  {path:'brand/edit/:id',component:BrandfromComponent , canActivate: [authGuard]},
  {path:'orders',component:OrdersComponent , canActivate: [authGuard]},
  {path:'DeliveryMethod',component:DeliveryMethodComponent , canActivate: [authGuard]},
  {path:'DeliveryMethod/edit/:id',component:DeliveryFromComponent , canActivate: [authGuard]},
  {path :'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
