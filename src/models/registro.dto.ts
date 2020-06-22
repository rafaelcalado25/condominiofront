import { DateTime } from "ionic-angular";

export interface RegistroDTO {
  modificadoem: DateTime;
  modificadopor: string;
  criadoem: DateTime;
  criadopor: string;
}