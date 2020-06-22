import { PessoaDTO } from "./pessoa.dto";
 import { EdificioDTO } from "./edificio.dto";

export interface CondominioDTO {
  id: number;
  numero: string;
  nome: string;
  sindico: PessoaDTO;
  numeroApartamentos: number;
  endereco: string;
  valor: number;
  conta: string;
  agencia: string;
  valorCaixa: number;
  valorDespesaUltimoMes: number;
  edificios: EdificioDTO[]; 
  diaDeVencimento: string;
		 
}