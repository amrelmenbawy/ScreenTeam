import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Ideliverymethod } from 'src/app/Models/ideliverymethod';
import { DeliverymethodService } from 'src/app/Services/deliverymethod.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.component.html',
  styleUrls: ['./delivery-method.component.css']
})
export class DeliveryMethodComponent implements OnInit {

  delivery : Ideliverymethod [] = []  
  constructor(private deliverymethodService :DeliverymethodService , public dialog:MatDialog , public toster :ToastrService){

  }
  ngOnInit(): void {
    this.deliverymethodService.GetAll().subscribe(res => this.delivery=res)
  }

  openConfirmationDialogDelete(id :any )
  {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete '
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
    } 
  })
}
  delete(productID :any){
    this.deliverymethodService.Delete(productID).subscribe(
      ()=>{
        this.toster.success("Successfully Deleted")
        this.ngOnInit()}
    )
  
  }
}
