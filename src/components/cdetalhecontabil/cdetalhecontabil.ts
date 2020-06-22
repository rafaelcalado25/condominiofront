import { Component, Input,  } from '@angular/core';
import { LancamentoDTO } from '../../models/shared/lancamento.dto';

/**
 * Generated class for the CdetalhecontabilComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cdetalhecontabil',
  templateUrl: 'cdetalhecontabil.html'
})
export class CdetalhecontabilComponent {

  @Input() mesCorrente: string;
  @Input() anoCorrente: string;
  @Input() saldo: number;
  @Input()lancamentosCorrenteCredito: LancamentoDTO[] = [];
  @Input() lancamentosCorrenteDebito: LancamentoDTO[] = [];
  

  constructor() {
    
    
  }

}
