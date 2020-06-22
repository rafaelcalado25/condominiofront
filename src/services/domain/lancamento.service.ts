import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { LancamentoDTO } from "../../models/shared/lancamento.dto";

@Injectable()
export class LancamentoService {

  constructor(private http: HttpClient){
    

  }

  salvarLancamentoBalanco(idBalanco: number, 
    lancamento:LancamentoDTO) : Observable<LancamentoDTO>{
    return this.http.post<LancamentoDTO>(`${API_CONFIG.baseURL}/lancamento/${idBalanco}/lancamentobalanco`,
    lancamento);
  }
}