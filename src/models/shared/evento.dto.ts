import { StatusEvento } from "./statusevento.dto";

export interface Evento {
  
  id:number,
  ativo:boolean,
  tipo: number,
  idreferencia : number,
  descricao: string,
  protocolo: string,
  dt_evento: Date,
  status: StatusEvento
}