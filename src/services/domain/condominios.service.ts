import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CondominioDTO } from "../../models/shared/condominio.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ApartamentoDTO } from "../../models/shared/apartamento.dto";


@Injectable()
export class CondominioService {

  constructor(private http: HttpClient){

  }

  findAll() : Observable<CondominioDTO[]>{
    return this.http.get<CondominioDTO[]>(`${API_CONFIG.baseURL}/condominio`);
  }

  findCondominio(idCondominio: number) : Observable<CondominioDTO>{
    if(idCondominio)
    return this.http.get<CondominioDTO>(`${API_CONFIG.baseURL}/condominio/`+idCondominio);
  }

  findCondominioSindico() : Observable<CondominioDTO[]>{    
    return this.http.get<CondominioDTO[]>(`${API_CONFIG.baseURL}/condominio/condominiosindico`);
  }

  gerarCondominioGeralMesCorrente(idCondominio: number)  {
    //let usuario: LocalUser = this.storageService.getLocalUser();
    if(idCondominio)
     return this.http.post(
       `${API_CONFIG.baseURL}/condominio/`+idCondominio,
       [],
       {   
        observe:'response',
        responseType: 'text'
      });
       
  }
  gerarCondominioGeralMesEspecifico(idCondominio: number,
    mes: string, ano: string)  {
    //let usuario: LocalUser = this.storageService.getLocalUser();
    if(idCondominio)
      return this.http.post(
       `${API_CONFIG.baseURL}/condominio/`+idCondominio+`?mes=`+mes+`&ano=`+ano,
       [],
       {   
        observe:'response',
        responseType: 'text'
      });        
  }

  gerarCondominioEspecifico(idCondominio: number, apartamentos: ApartamentoDTO[],
    mes: string, ano: string)  {
    //let usuario: LocalUser = this.storageService.getLocalUser();
    if(idCondominio && apartamentos){
      return this.http.post(
        `${API_CONFIG.baseURL}/condominio/`+idCondominio+`?mes=`+mes+`&ano=`+ano,
        apartamentos,
        {   
         observe:'response',
         responseType: 'text'
       }); 
    }
      
       
  }
  
}