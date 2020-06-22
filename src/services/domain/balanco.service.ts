import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BalancoDTO } from "../../models/shared/balanco.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class BalancoService {

  constructor(private http: HttpClient){
    

  }

  findAllPorCondominio() : Observable<BalancoDTO[]>{
    return this.http.get<BalancoDTO[]>(`${API_CONFIG.baseURL}/balanco`);
  }
}