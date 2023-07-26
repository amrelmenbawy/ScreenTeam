import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
   constructor(private accountService:AccountService,private router:Router, private activatedRoute:ActivatedRoute) { 
   this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
   }
  // ngOnInit(): void {
  //    const token = localStorage.getItem('token');
  //    if(token != null ){
  //    this.accountService.loadCurrentUser(token).subscribe();}
  // }
   returnUrl:string="";

  siginForm = new FormGroup({   
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  formoperation(e: Event) {
    e.preventDefault();
    if(this.siginForm.valid) {
      console.log('Form submitted:', this.siginForm.value);
      // Add your code here to handle form submission
      this.accountService.login(this.siginForm.value).subscribe({
      next:user=>this.router.navigateByUrl(this.returnUrl)
      })
      // this.siginForm.reset(); // Reset the form's values
    } else {
      console.log('Form is not valid');
      this.siginForm.markAllAsTouched();
    }
  }

  get getemail() {
    return this.siginForm.controls['email'];
  }
  get getpassword() {
    return this.siginForm.controls['password'];
  }
  
}
