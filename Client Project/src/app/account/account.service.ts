
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, User } from '../shared/Model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl=environment.apiUrl;
  private currentUserSource = new ReplaySubject<User|null>(1);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient,private router:Router) { }

  //http://localhost:5180/api/Account/currentuser
  loadCurrentUser(token:string|null)
  {
    if(token==null)
    {
      this.currentUserSource.next(null);
      return of(null);
    }
     let headers = new HttpHeaders();
     headers = headers.set('Authorization',`Bearer ${token}`);

     return this.http.get<User>(this.baseUrl +'Account/currentuser',{headers}).pipe(
      map(user=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          return user;
        }
        else {
          return null;
        }
      })
     )
  }

  register(values:any)
  {
    return this.http.post<User>(this.baseUrl+'account/register',values).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  login(values:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login',values).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
        return user;
      })
    )
  }

  logout()
  {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string)
  {
     return this.http.get<boolean>(this.baseUrl+'account/emailExist?email='+email);
  }
  getUserAddress()
  {
    return this.http.get<Address>(this.baseUrl+'account/address',)
  }

  updateAddress(address:Address)
  {
   return this.http.put(this.baseUrl+'account/address',address);
  }

  get isAuthenticated(){
    return  localStorage.getItem("token")?true:false;
  }
}
