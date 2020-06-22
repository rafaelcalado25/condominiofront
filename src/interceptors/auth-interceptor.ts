import { Injectable } from "@angular/core";
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();

    let n = API_CONFIG.baseURL.length;
    let requestToApi = req.url.substring(0,n) == API_CONFIG.baseURL;

    if (localUser && requestToApi){
      const authReq = req.clone({headers: req.headers.
          set(API_CONFIG.NM_SECURITY_AUTHENTICATION_NAME,'Bearer ' + localUser.token)});
      return next.handle(authReq);
    }else{
      return next.handle(req);
    }
    
  } 

};

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};