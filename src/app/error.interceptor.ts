import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './Admin/error-handling/error.component';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor{
  constructor(private dialogue:MatDialog){}
  intercept(req:HttpRequest<any>,next:HttpHandler){

    return next.handle(req).pipe(
        catchError((error:HttpErrorResponse)=>{
          let errorMessage="An unknowed error occured";
          if(error.error.message){
            errorMessage=error.error.message;
          }
          this.dialogue.open(ErrorComponent,{data:{message:errorMessage}});
          return throwError(error);
        }
      )
    );
  }
}
