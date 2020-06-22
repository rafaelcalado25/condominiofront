import { Component, Output, EventEmitter, Input,  } from '@angular/core';
import { MensalidadeDTO } from '../../models/shared/mensalidade.dto';
import { ApartamentoDTO } from '../../models/shared/apartamento.dto';
import { DocumentoService } from '../../services/domain/documento.service';
import { API_CONFIG } from '../../config/api.config';
import { ToastController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { MensalidadeService } from '../../services/domain/mensalidades.service';
import { DocumentoDTO } from '../../models/shared/documento.dto';


@Component({
  selector: 'cdetalhecondominio',
  templateUrl: 'cdetalhecondominio.html'
})
export class CdatalhecondominioComponent {

  @Output() chave = new EventEmitter<boolean>();
  @Input() mensalidade: MensalidadeDTO;
  @Input() apartamento: ApartamentoDTO;
  @Input() documentos: DocumentoDTO[] = [];
  @Input() pagamentoSinalizado: boolean;
  @Input() protocoloSinalizar: string = '';
  idDocComprovante: number;
  constructor( private documentoService: DocumentoService
    , private storage: StorageService, private toastCtrl: ToastController,
    private mensalidadeService: MensalidadeService) {      
    
  }

  esconder(){
    this.chave.emit(true);
  }

  
  presentToastWarning(texto: string) {
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 3000,
      position: 'top',
      cssClass: 'warningToast'
    });
  
    toast.onDidDismiss(() => {      
      
    });
  
    toast.present();
  }

  comprovante(){
    var documento = this.mensalidade.documentos.filter(x => {
      return x.tipo.id === 1;
    });
    if(documento && documento.length > 0){
      let localUser = this.storage.getLocalUser();
      this.idDocComprovante = documento[0].id;
      window.open(`${API_CONFIG.baseURL}/documento/`+this.idDocComprovante+`/anexo/`+localUser.username);
      this.documentoService.gerarDocumentoComprovante(this.idDocComprovante);

      
    }else {
      this.presentToastWarning('Não existe comprovante de pagamento para esta mensalidade');
      
    }
    
    
  }  
  
  visualizarTaxaExtra(id:number){
    let localUser = this.storage.getLocalUser();
    window.open(`${API_CONFIG.baseURL}/documento/`+id+`/anexo/`+localUser.username);
      this.documentoService.gerarDocumentoComprovante(id);
  }

  sinalizarPagamento(){
    this.mensalidadeService.sinalizarPagamento(this.mensalidade).subscribe(
      response => {        
        this.protocoloSinalizar = response.protocolo;
      }
    );
    this.pagamentoSinalizado = true;
  }

}
