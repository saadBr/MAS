import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthentificationServices } from './authentification.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthentificationInteceptor implements HttpInterceptor{
  constructor(private authentifactionSerice:AuthentificationServices){}

  intercept(req:HttpRequest<any>,next:HttpHandler){
    const authToken = this.authentifactionSerice.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization','bearer '+authToken)
    });
    return next.handle(authRequest);
  }
}
