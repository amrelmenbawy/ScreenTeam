import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  supportForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    message: new FormControl('',[Validators.required,Validators.maxLength(1000)])
  })
  formoperation(e: Event) {
    e.preventDefault();
    if(this.supportForm.valid) {
      console.log('Form submitted:', this.supportForm.value);
      // Add your code here to handle form submission
      this.supportForm.reset(); // Reset the form's values
    } else {
      console.log('Form is not valid');
      this.supportForm.markAllAsTouched();
    }
  }
  get getusername() {
    return this.supportForm.controls['username'];
  }
  get getemail() {
    return this.supportForm.controls['email'];
  }
  get getmessage() {
    return this.supportForm.controls['message'];
  }
}
