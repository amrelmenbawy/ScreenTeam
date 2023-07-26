import { Router } from '@angular/router';
import { AdminAuthService } from './../../Services/admin-auth.service';
import { Component } from '@angular/core';
import { Itoken } from 'src/app/Models/itoken';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string ="";
  password:string ="";
  error:boolean;
  userlogin:boolean;
  constructor( private AdminAuthService:AdminAuthService ,private Router:Router,private toster :ToastrService)
  {
    this.error=false;
    this.userlogin = false ;
  }
  ngOnInit(): void {
    this.AdminAuthService.loggedstatusadmin.subscribe(status=> this.userlogin = status);
  }
  login(){
    this.AdminAuthService.Login(this.email,this.password).subscribe({
      next:(Response :Itoken)=>{
        if(Response.role)
        {
          localStorage.setItem("token",Response.token)
          localStorage.setItem("displayName",`${Response.displayName}`)
          this.AdminAuthService.isloggedsubjectAdmin.next(true);
          this.toster.success(`Welcome Mr: ${Response.displayName}`)
          this.Router.navigate(['/Products'])
        }
        else{
          this.AdminAuthService.isloggedsubjectAdmin.next(false);
          this.email="";
          this.password="";
          this.error=true;
          this.toster.error("you donot have accsses here !")
        }
      },
      error:(error)=>{
        this.AdminAuthService.isloggedsubjectAdmin.next(false);
        this.email="";
        this.password="";
        this.error=true;
          this.toster.error("your Cardinalities are fault !")
      }
  })
}
}

