import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthentificationServices } from './authentification.service';
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authService:AuthentificationServices,private route:Router){}
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if(!isAuth){
      this.route.navigate(['/admin/auth/login']);
    }
    return true;
  }
}
