import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Idata } from 'src/app/Models/idata';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
types : Idata[] =[];
constructor(private ProductService : ProductService , private dialog : MatDialog , public toster :ToastrService) {}

ngOnInit(): void {
  this.ProductService.GetAllTypes().subscribe((response)=>this.types= response);
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
  this.ProductService.DeleteType(productID).subscribe(
  { next:()=>{
      this.toster.success("Successfully Deleted")
      this.ngOnInit()},
    error:()=>{
      this.toster.error("You Could not Delete Category Has Products !!! ")
    }
    }
  )

}

}
