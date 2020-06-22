import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Observable";
import { UsuarioNewDTO } from "../../models/shared/usuarionew.dto";
import { UsuarioPessoaDTO } from "../../models/shared/usuariopessoa.dto";

@Injectable()
export class UsuarioService {
  constructor(private http: HttpClient){

  }

  getNavUsuario() : Observable<String[]> {
    return this.http.get<String[]>(`${API_CONFIG.baseURL}/usuarios/usuarionav`);
  }

  criarUsuario(usuarionew: UsuarioNewDTO)  {
    //let usuario: LocalUser = this.storageService.getLocalUser();
    if(usuarionew)
     return this.http.post(
       `${API_CONFIG.baseURL}/usuarios/`,
       usuarionew,
       {   
        observe:'response',
        responseType: 'text'
      });
       
  }

  consultarPorUsername(username: string) : Observable<UsuarioPessoaDTO>{
    if(username)
    return this.http.get<UsuarioPessoaDTO>(
      `${API_CONFIG.baseURL}/usuarios/${username}/username`);
  }

  atualizarProfile(usuarioPessoa: UsuarioPessoaDTO) : Observable<boolean>{    
    return this.http.put<boolean>(
      `${API_CONFIG.baseURL}/usuarios/atualizarProfile`,
      usuarioPessoa);  
    }

  atualizarSenha(usuario: UsuarioNewDTO) : Observable<boolean>{    
    return this.http.put<boolean>(
      `${API_CONFIG.baseURL}/usuarios/atualizarSenha`,
      usuario);  
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