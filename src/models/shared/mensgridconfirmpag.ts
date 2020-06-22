export interface MensGridConfirmarPagamento {
  id: number;
  mes: string;
  ano: string;
  valor: number;
  vencimento: Date;
  pagamento: Date;
  aberto: boolean;
  numeroAp: string;
  nomeProprietario: string;
}