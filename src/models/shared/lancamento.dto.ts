import { RubricaDTO } from "./rubrica.dto";
import { MensalidadeDTO } from "./mensalidade.dto";
import { ApartamentoDTO } from "./apartamento.dto";
import { ControlePagamentoTaxaExtraDTO } from "./controlepagamentotaxaetra.dto";

export interface LancamentoDTO {

  id: number;
	rubrica: RubricaDTO;
	numeroParcela: number;
	totalParcelas: number;
	valor: number;
	vecimento: Date;
	efetivacao: Date;
	valorEfetivado: number;
	tipo: string;
	mensalidade: MensalidadeDTO;
	apartamentos?: ApartamentoDTO[];
	controle?: ControlePagamentoTaxaExtraDTO;

}