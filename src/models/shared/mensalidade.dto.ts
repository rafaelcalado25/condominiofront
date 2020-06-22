import { DocumentoDTO } from "./documento.dto";
import { Evento } from "./evento.dto";
import { ApartamentoDTO } from "./apartamento.dto";

export interface MensalidadeDTO {
  id: number;
  mes: string;
  ano: string;
  valor: number;
  vencimento: Date;
  pagamento: Date;
  aberto: boolean;
  documentos: DocumentoDTO[];
  eventos: Evento[];
  apartamento: ApartamentoDTO;

}