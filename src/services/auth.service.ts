import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/shared/credenciais.dto";
import { HttpClient, } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/shared/local_user";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper  = new JwtHelper();

  constructor(public http: HttpClient, public storeService: StorageService,
    ){

  }


  authenticate(creds: CredenciaisDTO): Observable<any>{
     
    return this.http.post(`${API_CONFIG.baseURL}/login`, creds,
      {
        observe:'response',
        responseType:'text',   
      });

  }

  refreshToken(): Observable<any>{
     
    return this.http.post(`${API_CONFIG.baseURL}/auth/refresh_token`, {},
      {
        observe:'response',
        responseType:'text',   
      });

  }

  successfulLogin(authorizationToken: string){
    if(authorizationToken){
      
      let token = authorizationToken.substr(7);
      let user: LocalUser = {
        token: token,
        username: this.jwtHelper.decodeToken(token).sub
      };
      this.storeService.setLocalUser(user);
    }
  }

  logout(){
    this.storeService.setLocalUser(null);
  }

  resetarSenhaUsuario(username: string)  {
    //let usuario: LocalUser = this.storageService.getLocalUser();
    if(username)
     return this.http.post(
       `${API_CONFIG.baseURL}/auth/forgot?user=`+username,
       [],
       {   
        observe:'response',
        responseType: 'text'
      });
       
  }

}