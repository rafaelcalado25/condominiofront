import { PessoaDTO } from "./pessoa.dto";
import { MensalidadeDTO } from "./mensalidade.dto";

export interface ApartamentoDTO {
  id: number;
  edificio: string;
  numero: string;
  debitos: number;
  regularizado: boolean;
  pessoa: PessoaDTO;
  mensalidades: MensalidadeDTO
}