import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { MensalidadeDTO } from "../../models/shared/mensalidade.dto";
import { ApartamentoDTO } from "../../models/shared/apartamento.dto";
import { MensGridConfirmarPagamento } from "../../models/shared/mensgridconfirmpag";
import { Evento } from "../../models/shared/evento.dto";
import { DocumentoDTO } from "../../models/shared/documento.dto";

@Injectable()
export class MensalidadeService {
  constructor(public http: HttpClient){

  }

  findAll() : Observable<MensalidadeDTO[]>{
    return this.http.get<MensalidadeDTO[]>(`${API_CONFIG.baseURL}/mensalidades`);
  }
  findApartamento(idMensalidade: number) : Observable<ApartamentoDTO>{
    if(idMensalidade)
    return this.http.get<ApartamentoDTO>(`${API_CONFIG.baseURL}/mensalidades/apartamento?pId=`+idMensalidade);
  }

  findDocumentosPorPeriodo(mes: string, ano: string, idApartamento: number) : Observable<DocumentoDTO[]>{
    if(mes && ano && idApartamento)
    return this.http.get<DocumentoDTO[]>(`${API_CONFIG.baseURL}/mensalidades/documentostaxasextra?mes=`
    +mes+`&ano=`+ano+`&idApartamento=`+idApartamento);
  }

  findDocumentosPorApartamento(idApartamento: number) : Observable<DocumentoDTO[]>{
    if(idApartamento)
    return this.http.get<DocumentoDTO[]>(`${API_CONFIG.baseURL}/mensalidades/documentostaxasextra?idApartamento=`+idApartamento);
  }
  consultarPor(paramentro: string) : Observable<MensalidadeDTO[]>{
    if( paramentro)
    return this.http.get<MensalidadeDTO[]>(
      `${API_CONFIG.baseURL}/mensalidades/recebido?pParamentro=`+paramentro);
  }
  consultarEmAberto(pAberto: boolean) : Observable<MensGridConfirmarPagamento[]>{    
    return this.http.get<MensGridConfirmarPagamento[]>(
      `${API_CONFIG.baseURL}/mensalidades/emAberto?aberto=`+
      pAberto);  
    }

  efetuarBaixas(mensalidades: MensGridConfirmarPagamento[]) : Observable<Map<number,boolean>>{    
    return this.http.put<Map<number,boolean>>(
      `${API_CONFIG.baseURL}/mensalidades/efetuarbaixas`,
      mensalidades);  
    }

  sinalizarPagamento(mensalidade: MensalidadeDTO) : Observable<Evento>{    
    return this.http.post<Evento>(
      `${API_CONFIG.baseURL}/mensalidades/sinalizarPagamento`,
      mensalidade);  
    }   
  
  consultarPagamentosSinalizados() : Observable<MensGridConfirmarPagamento[]>{    
    return this.http.get<MensGridConfirmarPagamento[]>(
      `${API_CONFIG.baseURL}/mensalidades/consultarPagamentosSinalizados`);  
    }   
}