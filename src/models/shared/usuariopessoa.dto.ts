import { RegistroDTO } from "../registro.dto";

export interface UsuarioPessoaDTO {
  id?: number;
  username?: string;
  email?: string;
  nome ?: string;
  cpf ?: string;
  telefones? : string[];
  registro?: RegistroDTO;
  
}