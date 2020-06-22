import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { BalancoService } from '../../services/domain/balanco.service';
import { BalancoDTO } from '../../models/shared/balanco.dto';
import { LancamentoDTO } from '../../models/shared/lancamento.dto';
import { RubricaNomeDTO } from '../../models/shared/rubricanome.dto';
import { RubricaService } from '../../services/domain/rubrica.service';
import { MAP_TP_RUBRICA_TP_LANCAMENTO } from '../../config/constantes';
import { LancamentoService } from '../../services/domain/lancamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApartamentoDTO } from '../../models/shared/apartamento.dto';

/**
 * Generated class for the ConsultabalancoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultabalanco',
  templateUrl: 'consultabalanco.html',
})
export class ConsultabalancoPage {
  balancos: BalancoDTO [] = [];
  balancoCorrente: BalancoDTO;
  mesCorrente: string;
  anoCorrente: string;
  saldo: number;
  lancamentosCorrenteCredito: LancamentoDTO[] = [];
  lancamentosCorrenteDebito: LancamentoDTO[] = [];
  indice: number = 0;
  chave= true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public balancoService: BalancoService, public modalCtrl: ModalController,
    private toastCtrl: ToastController) {

      this.balancoService.findAllPorCondominio().subscribe(
        response => {
          if (response){
            this.balancos = response;
            this.indice = this.balancos.length -1;
          }
          if(response && response.length>0){
            this.balancoCorrente = response[this.indice];
            this.alocarCampoTela();
          }
        },
        error =>{
          console.log(error);
          
          if(error.status === 403){
            this.presentToastError(error.message);
            this.navCtrl.setRoot("LoginPage");
          }
        }
      );
  }  

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(inserirlancamentobalanco, { balancoCorrente: this.balancoCorrente });
    profileModal.onDidDismiss(data => {
      this.chave = true;
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    this.chave = false;
    profileModal.present();
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

  segmentChanged(evento){
    if(evento =='anterior'){
      if(this.indice == 0){
        this.indice = this.balancos.length - 1;
      }else{
        this.indice--;
      }
    }else{
      if(this.indice == this.balancos.length - 1){
        this.indice = 0;        
      }else{
        this.indice++;
      }

    }
    this.balancoCorrente = this.balancos[this.indice];
    this.alocarCampoTela()
    
  }

  alocarCampoTela(){
    this.anoCorrente = this.balancoCorrente.anoReferencia;
    this.mesCorrente = this.balancoCorrente.mesReferencia;
    this.saldo = this.balancoCorrente.saldo;
    this.lancamentosCorrenteCredito = [];
    this.lancamentosCorrenteDebito = [];
    
    if(this.balancoCorrente && 
      this.balancoCorrente.lancamentos && this.balancoCorrente.lancamentos.length>0){
        this.balancoCorrente.lancamentos.map(l => {
          if(l.tipo == 'CREDITO'){
            this.lancamentosCorrenteCredito.push(l);
          }
          if(l.tipo == 'DEBITO'){
            this.lancamentosCorrenteDebito.push(l);
          }
        });
      }
  }

  ionViewDidLoad() {
    
  }

}


@Component({
  selector: 'page-consultabalanco',
  templateUrl: 'inserirlancamentobalanco.html',
})

export class inserirlancamentobalanco {

  rubricaNome: RubricaNomeDTO;
  rubricasNome: RubricaNomeDTO [];
  balancoCorrente: BalancoDTO;
  teste: number;
  descricao: string;
  now: Date = new Date();
  anoquevem = this.now.getFullYear() + 1;
  myDate: any = this.now.toISOString();
  //dataPagamento: any = this.now.toISOString();
  lancamentoCorrente: LancamentoDTO;
  numeroParcela: number;
  valor: number;
  loading: any;
  formGroup: FormGroup;
  apartamentos: ApartamentoDTO[];
  apartamentosEscolhidos : ApartamentoDTO[];
  constructor(public viewCtrl: ViewController,
   public params: NavParams, public rubricaSevice: RubricaService,
   public lancamentoService : LancamentoService, public navCtrl: NavController,
   public formBuilder: FormBuilder,
   private loadingController:LoadingController,private toastCtrl: ToastController) {
    
    this.formGroup = this.formBuilder.group({
      dataPagamento: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      valor: ['', [Validators.required, Validators.pattern("^[0-9]+(.[0-9]{1,2})?$")]],
      nome: ['', [Validators.required]],
      numeroParcela: ['', [Validators.required, Validators.pattern("^([1-9]{1}|1[0-2]{1})")]],
      apartamento:['',[]]
    });
    this.balancoCorrente = params.get('balancoCorrente');
    this.apartamentos = [];
    this.balancoCorrente.condominio.edificios.map(e => {
      this.apartamentos.push(... e.apartamentos);
    });
    this.rubricaSevice.findAllRubricasNomeExcetoMensalidade().subscribe(
      response => {
        this.rubricasNome = response;
        /* O rubricanome vem com a informação do tipo do lançamento e do 
        tipo de rubrica. Dessa forma o backend vai ter uma regra para 
        interpretar o valor dessas duas variaveis a partir do rubricanome*/
        
      },
      error => {
        this.presentToastError(error.message);
        if(error.status === 403){
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

  dismiss() {
    
  }

  lerNome(){
    this.rubricaNome = this.rubricasNome[this.formGroup.controls.nome.value];
    if(this.rubricaNome.tipoRubrica == 'RECEITA')
    this.formGroup.controls.numeroParcela.setValue(1);
  }

  lerApartamento(){
    this.apartamentosEscolhidos = [];
     if(this.formGroup.controls.apartamento.value == this.apartamentos.length){
      this.apartamentosEscolhidos.push(... this.apartamentos);
      
      
    }else{
      if(this.formGroup.controls.apartamento.value){
        this.formGroup.controls.apartamento.value.map( a => {
          if(a < this.apartamentos.length){
            this.apartamentosEscolhidos.push(this.apartamentos[a])
          }
        });
      }
      
    } 
    
  }

  pegarValor(){
    
  }

  salvarLancamento(){
    this.loading = this.loadingController.create({ content: "Processando a baixa..." });
    this.loading.present(); 

    var rubrica = {
      id: undefined,
      nome: this.rubricasNome[this.formGroup.controls.nome.value],
      tipoRubrica: this.rubricaNome.tipoRubrica,
      descricao: this.formGroup.controls.descricao.value,
      valorTotal: this.formGroup.controls.valor.value * this.formGroup.controls.numeroParcela.value,
      numeroParcelas: this.formGroup.controls.numeroParcela.value,
      parcelaRecente: 1,
    }
    this.lancamentoCorrente = {
      id: undefined,
	    rubrica: rubrica,
      numeroParcela: 1, 
      totalParcelas: this.formGroup.controls.numeroParcela.value,
      valor: this.formGroup.controls.valor.value,
      vecimento: this.formGroup.controls.dataPagamento.value,
      efetivacao: this.formGroup.controls.dataPagamento.value,
      valorEfetivado: this.formGroup.controls.valor.value,
      tipo: MAP_TP_RUBRICA_TP_LANCAMENTO.get(this.rubricaNome.tipoRubrica),
      mensalidade: undefined,
      apartamentos: this.apartamentosEscolhidos,
    }
    rubrica.descricao = rubrica.descricao.toUpperCase();
    
    this.lancamentoService.salvarLancamentoBalanco(this.balancoCorrente.id,
      this.lancamentoCorrente).subscribe(response => {
        
        this.lancamentoCorrente = null;
        this.loading.dismiss();
        this.presentToastSucess('Lançamento Inserido com sucesso!');
        this.viewCtrl.dismiss('response');
      }),
      error => {
        this.loading.dismiss();
        this.presentToastSucess(error.message);
      };

  }  

  signupUser(){
    
  }

}
