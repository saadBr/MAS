import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './authentification.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL= environment.apiUrl+"user";

@Injectable({providedIn:"root"})
export class AuthentificationServices {
  private token:string;
  private isAuthenticated=false;
  private tokenTimer:any;
  private userId:string;
  private authStatusListnner = new Subject<boolean>();
  constructor(private http:HttpClient,private router:Router){}

  getToken(){
    return this.token;
  }

  getAuthStatusListnner(){
    return this.authStatusListnner.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }
  createUser(email:string,password:string){
    const authentificationData:User={email:email,password:password}
    this.http.post(BACKEND_URL+"/signup",authentificationData)
    .subscribe(()=>{
      this.router.navigate(['/']);
    },error=>{
      this.authStatusListnner.next(false);
    });
  }

  login(email:string,password:string){
    const authentificationData:User={email:email,password:password}
    this.http.post<{token:string,expiresIn:number,userId:string}>(BACKEND_URL+"/login",authentificationData)
    .subscribe(response=>{
      const token = response.token;
      this.token=token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatusListnner.next(true);
        this.isAuthenticated=true;
        this.userId=response.userId;
        const now = new Date();
        const expiresDate = new Date(now.getTime()+expiresInDuration*1000);
        this.saveAuthData(token,expiresDate,this.userId);
        this.router.navigate(['/admin/effectif/ajouter']);
      }
    },error=>{
      this.authStatusListnner.next(false);
    });
  }

  private setAuthTimer(duration:number){
    this.tokenTimer=setTimeout(()=>{
      this.logout();
    },duration*1000);
  }
  autoAuthUser(){
    const authInfromation=this.getAuthData();
    if(!authInfromation){
      return;
    }
    const now = new Date();
    const expiresIn = authInfromation.expiration.getTime() - now.getTime() ;
    if(expiresIn>0){
      this.token=authInfromation.token;
      this.isAuthenticated=true;
      this.userId=authInfromation.userId;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListnner.next(true);
    }
  }

  logout(){
    this.token=null;
    this.isAuthenticated=false;
    this.authStatusListnner.next(false);
    this.userId=null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token:string,expiresInDate:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expiresInDate.toISOString());
    localStorage.setItem('userId',userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expiration){
      return;
    }
    return{
      token: token,
      expiration: new Date(expiration),
      userId:userId
    }
  }
}
