import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class DocumentoService {
  constructor(public http: HttpClient){

  }

  gerarDocumentoComprovante(id:number) {
    return this.http.get(`${API_CONFIG.baseURL}/documento/`+id+`/anexo`);
  }

  /* findAll() : Observable<MensalidadeDTO[]>{
    return this.http.get<MensalidadeDTO[]>(`${API_CONFIG.baseURL}/mensalidades`);
  }
  findApartamento(idMensalidade: number) : Observable<ApartamentoDTO>{
    if(idMensalidade)
    return this.http.get<ApartamentoDTO>(`${API_CONFIG.baseURL}/mensalidades/apartamento?pId=`+idMensalidade);
  }
  consultarPor(edificio: string, paramentro: string) : Observable<MensalidadeDTO[]>{
    if(edificio && paramentro)
    return this.http.get<MensalidadeDTO[]>(
      `${API_CONFIG.baseURL}/mensalidades/recebido?pEdificio=`+
      edificio+ `&pParamentro=`+paramentro);
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
    } */
}