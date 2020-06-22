import { ApartamentoDTO } from "./apartamento.dto";

export interface EdificioDTO {
  id: number;
  bloco: string;
  nome: string;
  apartamentos: ApartamentoDTO[];  
}