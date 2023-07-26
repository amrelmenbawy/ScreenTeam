import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/Services/admin-auth.service';
import { MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isuserlogging:boolean =false;
  username:string | null;
  constructor(private AuthService :AdminAuthService, private Router :Router,public dialog: MatDialog ,public toster:ToastrService)
  {
    this.username="";
  }
  ngOnInit()
  {
    this.AuthService.loggedstatusadmin.subscribe(status =>{
      this.isuserlogging= status
      this.username=localStorage.getItem("username");
    })
  };
  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to log out?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }
  logout(){
        this.AuthService.logout();
        this.Router.navigate(['/login']);
        this.toster.success(`Bye Bye`)
  }
}
