import { Component } from '@angular/core';
import { MensalidadeService } from '../../services/domain/mensalidades.service';
import { MensalidadeDTO } from '../../models/shared/mensalidade.dto';


@Component({
  selector: 'consolidadoedificio',
  templateUrl: 'consolidadoedificio.html'
})
export class ConsolidadoedificioComponent {

  valorMesCorrente: number;
  valorAnoCorrente: number;
  valorPendenciaMesCorrente: number;
  valorPendenciaAnoCorrente: number;
  mensalidadesMes: MensalidadeDTO[];
  mensalidadesAno: MensalidadeDTO[];
  teste = 'Rafael'
  
  constructor(private mensalidadeService: MensalidadeService) {
    this.mensalidadeService.consultarPor('mesCorrente').subscribe(
      response => {
        this.mensalidadesMes = response;
        if(this.mensalidadesMes){
          this.valorMesCorrente = 0;
          this.valorPendenciaMesCorrente =0;
          this.mensalidadesMes.forEach(m => {
            if(!m.aberto){
              this.valorMesCorrente= this.valorMesCorrente + m.valor;
            } else {
              this.valorPendenciaMesCorrente = this.valorPendenciaMesCorrente + m.valor;
            }           
          });
        }
      },
      error =>{
        console.log(error);
      }
    );
    this.mensalidadeService.consultarPor('anoCorrente').subscribe(
      response => {
        this.mensalidadesAno = response;
        if(this.mensalidadesAno){
          this.valorAnoCorrente = 0;
          this.valorPendenciaAnoCorrente = 0;
          this.mensalidadesAno.forEach(m => {
            if(!m.aberto){
              this.valorAnoCorrente= this.valorAnoCorrente + m.valor;
            }  else {
              this.valorPendenciaAnoCorrente = this.valorPendenciaAnoCorrente + m.valor;
            }          
          });
        }
      },      
      error =>{
        console.log(error);
      }
    );

    
    
  }

}
