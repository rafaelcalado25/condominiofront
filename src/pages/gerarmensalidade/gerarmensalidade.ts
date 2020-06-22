import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CondominioService } from '../../services/domain/condominios.service';
import { ApartamentoDTO } from '../../models/shared/apartamento.dto';
import { CondominioDTO } from '../../models/shared/condominio.dto';

/**
 * Generated class for the GerarmensalidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gerarmensalidade',
  templateUrl: 'gerarmensalidade.html',
})
export class GerarmensalidadePage {

  VL_RADIO_GERAR_MES_CORRENTE = 1;
  VL_RADIO_GERAR_MES_PASSADO = 2;
  VL_RADIO_GERAR_ESPECIFICO = 3;
  tpConsulta = this.VL_RADIO_GERAR_MES_CORRENTE;
  apartamentos : ApartamentoDTO[];
  apartamentosEscolhidos: ApartamentoDTO[];
  condominio: CondominioDTO;
  now: Date = new Date();
  myDate: any = this.now.toISOString();
  anoquevem = this.now.getFullYear() +1;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private condominioService: CondominioService,
    private loadingController:LoadingController, private toastCtrl: ToastController) {
      this.apartamentos = [];
      this.loading = this.loadingController.create({ content: "Gerando mensalidade..." });
      this.condominioService.findCondominioSindico().subscribe(
        response => {
          this.condominio = response[0];
          if(this.condominio && this.condominio.edificios){
            this.condominio.edificios.forEach(e => {
              if(e && e.apartamentos){
                e.apartamentos.forEach(a => {
                  this.apartamentos.push(a);
                });
              }
            });
          }

        },
        error => {
          this.presentToastErro(error.message);
          if(error.status === 403){
            console.log(error);
            this.navCtrl.setRoot("LoginPage");
          }
        }
      );
    
  }
  presentToastSucess(texto: string) {
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 5000,
      position: 'bottom',
      cssClass: 'suscessoToast'
    });
  
    toast.onDidDismiss(() => {
      
    });
  
    toast.present();
  }

  presentToastErro(texto: string) {
    let toast = this.toastCtrl.create({
      message: texto,
      duration: 5000,
      position: 'bottom',
      cssClass: 'erroToast'
      
    });
  
    toast.onDidDismiss(() => {
      
    });
  
    toast.present();
  }

  ionViewDidLoad() {
    
  }

  reset(value){
    
  }
  pegarValor(){
    
  }

  onApartamentosEscolhidos(){
    
}
  presentGerarTaxa(){
    this.loading = this.loadingController.create({ content: "Gerando mensalidade..." });
    this.loading.present(); 
    if(this.tpConsulta === this.VL_RADIO_GERAR_MES_CORRENTE){
      console.log('Pega todos os apartamentos do condominio e gera taxa para o mes corrente');
      this.condominioService.gerarCondominioGeralMesCorrente(this.condominio.id).subscribe(
        response => {
          if(response){
            this.loading.dismiss();
          }  
          this.presentToastSucess('Mensalidades do mês corrente geradas com sucesso');
        },
        erro => {
          this.presentToastErro(erro.message);
          this.loading.dismiss();
          if(erro.status === 403){
            console.log(erro);
            this.navCtrl.setRoot("LoginPage");
          }
          console.log(erro);
        }
      );
    }else if(this.tpConsulta === this.VL_RADIO_GERAR_MES_PASSADO && this.myDate &&
      this.myDate.substr(0,4) && this.myDate.substr(5,2)){
      console.log('Pega todos os apartamentos do condominio e gera taxa para o mes/ano escolhido');
      this.condominioService.gerarCondominioGeralMesEspecifico(this.condominio.id,
        this.myDate.substr(5,2), this.myDate.substr(0,4)).subscribe(
        response => {
          if(response){
            this.loading.dismiss();
          }  
          this.presentToastSucess('Mensalidades do mês ' + this.myDate.substr(5,2) +
            ' e do ano ' + this.myDate.substr(0,4) + ' gerados com sucesso para todos os apartamentos'  );
        },
        erro => {
          this.presentToastErro(erro.message);
          this.loading.dismiss();
          if(erro.status === 403){
            this.navCtrl.setRoot("LoginPage");
          }
          console.log(erro);
        }
      );
    }else if(this.VL_RADIO_GERAR_ESPECIFICO === this.tpConsulta &&
      this.apartamentosEscolhidos){
      this.condominioService.gerarCondominioEspecifico(this.condominio.id,
        this.apartamentosEscolhidos,
        this.myDate.substr(5,2), this.myDate.substr(0,4)).subscribe(
        response => {
          if(response){
            this.loading.dismiss();
          }  
          this.presentToastSucess('Mensalidades para os apartamentos escolhidos '+             
            ' para o mês ' + this.myDate.substr(5,2) +
            ' e ano ' + this.myDate.substr(0,4) + ' gerados com sucesso'  );
        },
        erro => {
          this.presentToastErro(erro.message);
          this.loading.dismiss();
          if(erro.status === 403){
            this.navCtrl.setRoot("LoginPage");
          }
          console.log(erro);
        }
      );
      console.log('Pega todos os apartamentos do condominio e gera taxa para o mes corrente');
    }    
  }
  

}
