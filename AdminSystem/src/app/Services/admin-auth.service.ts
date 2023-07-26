import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Itoken } from './../Models/itoken';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  public isloggedsubjectAdmin :BehaviorSubject<boolean>;

  baseUrl:string ="http://localhost:5180/api/Account/login";
  constructor(private http :HttpClient ,private Router : Router ) {
    this.isloggedsubjectAdmin =new BehaviorSubject<boolean>(this.isAuthenticated);
  }

Login(email:any , password :any):Observable<Itoken>{
    let userdata ={
      "email":email,
      "password":password
    }
    return this.http.post<Itoken>(this.baseUrl,userdata)
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    this.isloggedsubjectAdmin.next(false);
  }
get isAuthenticated(){
    return  localStorage.getItem("token")?true:false;
  }
get loggedstatusadmin(){
  return this.isloggedsubjectAdmin.asObservable();
}
}
