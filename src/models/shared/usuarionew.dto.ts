import { PessoaDTO } from "./pessoa.dto";

export interface UsuarioNewDTO {
  id: number;
  pessoa?: PessoaDTO;
  password: string;
  username: string;
  email?: string;

}