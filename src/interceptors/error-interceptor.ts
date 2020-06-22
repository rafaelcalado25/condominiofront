import { Injectable } from "@angular/core";
import { HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable} from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService,
    ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(
      (error, caught) =>{

        let errorObj = error;

        if(errorObj.error){
          errorObj = errorObj.error;
        }
        if(!errorObj.status){
          errorObj = JSON.parse(errorObj);
        }        

        switch(errorObj.status){
          case 403:
            //Erro de acesso negado
            errorObj.message = this.tratarError403();
              break;
        }

        return Observable.throw(errorObj);
      }
    ) as any; 
  }

  tratarError403(): string { 
    this.storage.setLocalUser(null);
    return 'Erro de acesso. Verifique se você está logado, ou senão você tem acesso a transação';
    
  }

};

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};