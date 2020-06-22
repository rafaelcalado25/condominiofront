import { ApartamentoDTO } from "./apartamento.dto";
import { Evento } from "./evento.dto";
import { LancamentoDTO } from "./lancamento.dto";

export interface ControlePagamentoTaxaExtraDTO {
  id: number;
  evento?: Evento;
  apartamento?: ApartamentoDTO;
  lancamento?: LancamentoDTO;  
}