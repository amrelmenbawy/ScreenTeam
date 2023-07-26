import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { Idata } from 'src/app/Models/idata';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  types : Idata[] =[];
  constructor(private ProductService : ProductService ,public toster: ToastrService , public dialog :MatDialog) {}

  ngOnInit(): void {
    this.ProductService.GetAllBrands().subscribe((response)=>this.types= response);
  }

  openConfirmationDialogDelete(productID :any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
    {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(productID)
    }
  });
  }

  delete(productID :any){
    this.ProductService.Deletebrand(productID).subscribe(
    { next:()=>{
        this.toster.success("Successfully Deleted")
        this.ngOnInit()},
      error:()=>{
        this.toster.error("You Could not Delete Brand Has Products !!! ")
      }

      }
    )

  }

}
