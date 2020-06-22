import { ApartamentoDTO } from "./apartamento.dto";

export interface PessoaDTO {
  id: number;
  cpf: string;
  nome: string;
  telefones: string[];
  apartamentos: ApartamentoDTO[];

}