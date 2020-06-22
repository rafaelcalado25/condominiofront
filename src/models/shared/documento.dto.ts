import { TipoDocumentoDTO } from "./tipodocumento.dto";

export interface DocumentoDTO {
  id: number;
  codigo: string;
  tipo: TipoDocumentoDTO; 

}