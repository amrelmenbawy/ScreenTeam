import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  signupForm = new FormGroup({
    displayName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]:;'<>,.?/\\-])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+~`|}{[\]:;'<>,.?/\\-]+$/ )]),
    // confirmpasswordsignup: new FormControl (['', Validators.required]) 
  })

  constructor(private accountService:AccountService, private router:Router) { }
  
  ngOnInit(): void {
    
  }

  signupformoperation(e: Event) {
    e.preventDefault();
    if(this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      this.accountService.register(this.signupForm.value).subscribe({
        next: () => this.router.navigateByUrl('/shop')
      })
      // this.signupForm.reset(); // Reset the form's values
    } else {
      console.log('Form is not valid');
      console.log(this.signupForm.hasError);
      this.signupForm.markAllAsTouched();
    }
  }
  get getemailsignup() {
    return this.signupForm.controls['email'];
  }
  get getpasswordsignup() {
    return this.signupForm.controls['password'];
  }
  // get getconfirmpasswordsignup() {
  //   return this.signupForm.controls['confirmpasswordsignup'];
  // }
  get getusername() {
    return this.signupForm.controls['displayName'];
  }
}
