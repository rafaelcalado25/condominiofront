import { RubricaNomeDTO } from "./rubricanome.dto";

export interface RubricaDTO {

  id: number;
  nome: RubricaNomeDTO;
  tipoRubrica: string;
  descricao: string;
  valorTotal: number;
  numeroParcelas: number;
  parcelaRecente: number;

}