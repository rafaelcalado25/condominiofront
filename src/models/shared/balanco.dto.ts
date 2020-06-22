import { LancamentoDTO } from "./lancamento.dto";
import { CondominioDTO } from "./condominio.dto";

export interface BalancoDTO {

  id: number;
  tipoBalanco: number;
	mesReferencia: string;
	anoReferencia: string;
	balancoPai: BalancoDTO;
	fechado: boolean;
	saldo: number;
	criacao: Date;
	fechamento: Date;
	lancamentos: LancamentoDTO[];
	condominio: CondominioDTO;

}