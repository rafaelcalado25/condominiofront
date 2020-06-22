import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { RubricaNomeDTO } from "../../models/shared/rubricanome.dto";

@Injectable()
export class RubricaService {

  constructor(private http: HttpClient){
    

  }

  findAllRubricasNome() : Observable<RubricaNomeDTO[]>{
    return this.http.get<RubricaNomeDTO[]>(`${API_CONFIG.baseURL}/rubrica/rubricasnome`);
  }

  findAllRubricasNomeExcetoMensalidade() : Observable<RubricaNomeDTO[]>{
    return this.http.get<RubricaNomeDTO[]>(`${API_CONFIG.baseURL}/rubrica/rubricasnomexcetomensalidade`);
  }
}