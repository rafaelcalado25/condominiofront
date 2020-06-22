import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MensalidadeDTO } from '../../models/shared/mensalidade.dto';


@Component({
  selector: 'consolidadoindividual',
  templateUrl: 'consolidadoindividual.html'
})
export class ConsolidadoindividualComponent {

  text: string;
  @Input() valorPago: number;
  @Input() emAberto: number;
  @Input() chave: boolean;

  @Output() mostarAbertos= new EventEmitter<boolean>();

  mensalidades: MensalidadeDTO[];
  constructor() {   
    
  }

  detalharEmAberto(){
    this.mostarAbertos.emit(true);
  }

}
