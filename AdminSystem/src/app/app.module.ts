import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { ProductsComponent } from './Component/products/products.component';
import { CategoriesComponent } from './Component/categories/categories.component';
import { BrandsComponent } from './Component/brands/brands.component';
import { LoginComponent } from './Component/login/login.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { ProductfromComponent } from './Component/productfrom/productfrom.component';
import { CategoryfromComponent } from './Component/categoryfrom/categoryfrom.component';
import { BrandfromComponent } from './Component/brandfrom/brandfrom.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component'
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { ConfirmationDialogComponent } from './Component/confirmation-dialog/confirmation-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { OrdersComponent } from './Component/orders/orders.component';
import { DeliveryMethodComponent } from './Component/delivery-method/delivery-method.component';
import { OrderItemsComponent } from './Component/order-items/order-items.component';
import { DeliveryFromComponent } from './Component/delivery-from/delivery-from.component'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    LoginComponent,
    NotFoundComponent,
    ProductfromComponent,
    CategoryfromComponent,
    BrandfromComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    OrdersComponent,
    DeliveryMethodComponent,
    OrderItemsComponent,
    DeliveryFromComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    PaginationModule,
    MatDialogModule,
    ToastrModule.forRoot({timeOut:3000}),
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
