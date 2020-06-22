import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApartamentoService } from '../../services/domain/apartamentos.service';
import { ApartamentoDTO } from '../../models/shared/apartamento.dto';
import { MensalidadeDTO } from '../../models/shared/mensalidade.dto';

/**
 * Generated class for the ResumoapartamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resumoapartamentos',
  templateUrl: 'resumoapartamentos.html',
})
export class ResumoapartamentosPage {


  apartamentos: ApartamentoDTO[];
  mensagemErro: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apartamentoService: ApartamentoService,
    private toastCtrl: ToastController) {
      this.apartamentoService.findAll().subscribe(response => {
        this.apartamentos = response;  
            
      },
      erro => {
        this.presentToastError(erro.message);
        if(erro.status === 403){
          this.navCtrl.setRoot("LoginPage");
        }
        
      });
  }
 

  irApartamento(mensalidades: MensalidadeDTO[], apartamento: ApartamentoDTO){
    this.navCtrl.push('ResumocondominioPage',{mensalidades: mensalidades,
      apartamento:apartamento });
      
  }

  presentToastError(texto: string) {
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 5000,
      position: 'top',
      cssClass: 'mensagemErro',      
    });
  
    toast.onDidDismiss(() => {
      
    });
  
    toast.present();
  }

}
