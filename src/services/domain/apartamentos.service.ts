import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApartamentoDTO } from "../../models/shared/apartamento.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ApartamentoService {

  constructor(private http: HttpClient){

  }

  findAll() : Observable<ApartamentoDTO[]>{
    return this.http.get<ApartamentoDTO[]>(`${API_CONFIG.baseURL}/apartamentos`);
  }
}