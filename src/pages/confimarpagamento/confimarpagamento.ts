import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';
import { MensalidadeService } from '../../services/domain/mensalidades.service';
import { MensGridConfirmarPagamento } from '../../models/shared/mensgridconfirmpag';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-confimarpagamento',
  templateUrl: 'confimarpagamento.html',
})
export class ConfimarpagamentoPage {
  anos: string;
  meses: string[] = [];
  anosCons: string[] = [];
  mensalidades: MensGridConfirmarPagamento[];
  anoMesesMap: Map<string, string[]>;
  mesMensalidadesMap:Map<string, {mensalidade:MensGridConfirmarPagamento, escolhido: boolean}[]>;
  mesesHabilitados: string [];
  mesesEscolhidos: string [];
  mensalidadesEscolhidas: {mensalidade:MensGridConfirmarPagamento,escolhido: boolean} [];
  mensalidadesSinalizadas:MensGridConfirmarPagamento[];
  escolherTodos : boolean;
  tpConsulta : string;
  numerosAp : string[];
  apartamentosEscolhidos: string[];
  loading: any;
  mensagemErro: string;
  constructor(private mensalidadeService: MensalidadeService, private alertCtrl: AlertController,
    private loadingController:LoadingController, public navCtrl: NavController,
    private toastCtrl: ToastController) {
      this.loading = this.loadingController.create({ content: "Processando a baixa..." });
      this.anosCons = []; 
      this.numerosAp = [];
      this.anos = '';      
      this.anoMesesMap = new Map();
      this.mesMensalidadesMap = new Map();
      this.tpConsulta = 'mes';
      this.mensalidadeService.consultarEmAberto(true).subscribe(
        response => {
          this.mensalidades = response;
          this.preencherObjetosTela(this.mensalidades);
          this.mensalidadeService.consultarPagamentosSinalizados().subscribe(
            resposta => {
              this.mensalidadesSinalizadas = resposta;
              if(this.mensalidadesSinalizadas){
                this.mensalidadesEscolhidas = [];
                this.mensalidadesSinalizadas.forEach(m => {
                  this.mensalidadesEscolhidas.push({mensalidade:m, escolhido:false});
                });
              }
            }
          );
        },
        error => {
          this.mensagemErro = error.message;
          this.presentToastError(this.mensagemErro);
          if(error.status === 403){
            console.log(error);
            this.navCtrl.setRoot("LoginPage");
          }

        }
      );    
  }

  preencherObjetosTela(mensalidades: MensGridConfirmarPagamento[]){
    mensalidades.forEach(m => {
      let mesesNovo = [];
      let mensalidadesNovas = [];
      if(!this.numerosAp.find( x=> x === m.numeroAp)){
        this.numerosAp.push(m.numeroAp);
      }
      if(!this.anosCons.find(x => x ===m.ano)){              
        this.anosCons.push(m.ano);
        mesesNovo.push(m.mes);
        this.anoMesesMap.set(m.ano,mesesNovo);
        mensalidadesNovas.push({mensalidade:m, escolhido:false});
        this.mesMensalidadesMap.set(m.ano+m.mes, mensalidadesNovas);
      }else {
        this.meses = this.anoMesesMap.get(m.ano);
        if(this.meses && !this.meses.find(x => x ===m.mes)){
          let x = this.anoMesesMap.get(m.ano);
          x.push(m.mes);
          mensalidadesNovas.push({mensalidade:m, escolhido:false});
          this.mesMensalidadesMap.set(m.ano+m.mes, mensalidadesNovas);
        }else{
          let x = this.mesMensalidadesMap.get(m.ano+m.mes);
          x.push({mensalidade:m, escolhido:false});                
        }
      }  
    });
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
  
  anoEscolhido(){
    this.escolherTodos = false;
    this.mensalidadesEscolhidas = [];
    this.mesesEscolhidos = [];
    this.apartamentosEscolhidos = [];
    if(this.anos){      
        this.mesesHabilitados = this.anoMesesMap.get(this.anos);          
    }
    
  }

  mesEscolhidos(){
    this.mensalidadesEscolhidas = [];
    if(this.mesesEscolhidos){
      this.mensalidadesEscolhidas = [];
      this.mesesEscolhidos.forEach(m => {
        this.mensalidadesEscolhidas = this.mensalidadesEscolhidas.concat(
          this.mesMensalidadesMap.get(this.anos+m)
        );
      });      
    }
  }

  ionViewDidLoad() {
    
  }

  onEscolherTodos(event){
    if(this.mensalidadesEscolhidas &&
      this.mensalidadesEscolhidas.length > 0){
        if(this.escolherTodos){
          this.mensalidadesEscolhidas.forEach(x => {
            x.escolhido = true;
          })
        
      }else{
        this.mensalidadesEscolhidas.forEach(x => {
          x.escolhido = false;
        })        
      }

    }    
  }

  reset(){
    this.mensalidadesEscolhidas = [];
    this.anos = '';
    this.meses = [];
    this.mesesEscolhidos = [];    
  }

  onApartamentosEscolhidos(){
    this.mensalidadesEscolhidas = [];    
    var m = undefined;
    var passo;
    var key = '';
    for (passo = 1; passo <= 12; passo++) {
      key = '';
      if(passo<10){
        key = this.anos + '0' + passo;
      }else{
        key = this.anos + '' + passo;
      }
      m = this.mesMensalidadesMap.get(key);
      if(m){
        m.forEach(mensalidade => {
          if(this.apartamentosEscolhidos.find(x => {
            return (x === mensalidade.mensalidade.numeroAp)
          })
          ){
            this.mensalidadesEscolhidas.push(mensalidade);
          }
        });  
      }      
    }   
  }

  onEfetuarBaixas(mensalidades : MensGridConfirmarPagamento[]){
    this.loading = this.loadingController.create({ content: "Processando a baixa..." });
    this.loading.present();    
    var retorno: Map<number, boolean>;
    if(this.mensalidadesEscolhidas){      
      if(mensalidades && mensalidades.length > 0){
        this.mensalidadeService.efetuarBaixas(mensalidades).subscribe(
          response => {
            retorno = response;
            
           if (retorno) {
             this.reset();
              this.loading.dismiss();
              }
            this.presentToastSucess('Baixa realizada com sucesso!');
            
          }, 
          error => {
            this.loading.dismiss();
            console.log(error);
          }
        );
      }else{
        if (retorno) {
          this.loading.dismissAll();
          }
      }
    }else{
      if (retorno) {
        this.loading.dismissAll();
        }
    }
    
  }

  presentConfirmBaixa() {
    var mensalidades : MensGridConfirmarPagamento[] = [];
    var texto = 'Apartamento(s) <br>';
    var i = 0;
    if(this.mensalidadesEscolhidas){
      this.mensalidadesEscolhidas.map(m => {
        if(m.escolhido){
          i++;
          mensalidades.push(m.mensalidade);
          texto = texto + i + ' - ' + m.mensalidade.numeroAp+' : ' 
            + m.mensalidade.mes + '/'+m.mensalidade.ano + 
            ' : ' + m.mensalidade.valor   +'<br>';
        }
      });
    }
    let alert = this.alertCtrl.create({
      title: 'Confirmar Baixa dos registros abaixo?',
      message: texto,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cofirmar',
          handler: () => {
            this.onEfetuarBaixas(mensalidades);
            
          }
        }
      ]
    });
    alert.present();
  }

}
