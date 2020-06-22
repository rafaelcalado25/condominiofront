import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensalidadeService } from '../../services/domain/mensalidades.service';
import { MensalidadeDTO } from '../../models/shared/mensalidade.dto';
import { Mes } from '../../models/shared/mes.shared';
import { ApartamentoDTO } from '../../models/shared/apartamento.dto';
import { Evento } from '../../models/shared/evento.dto';
import { DocumentoDTO } from '../../models/shared/documento.dto';

/**
 * Generated class for the ResumocondominioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resumocondominio',
  templateUrl: 'resumocondominio.html',
})
export class ResumocondominioPage {

  anos: string[] = [];
  anosCons: any;

  filtroMes: Mes[] = [
    {numero: "01", nome:"JANEIRO"},
    {numero: "02", nome:"FEVEREIRO"},
    {numero: "03", nome:"MARÇO"},
    {numero: "04", nome:"ABRIL"},
    {numero: "05", nome:"MAIO"},
    {numero: "06", nome:"JUNHO"},
    {numero: "07", nome:"JULHO"},
    {numero: "08", nome:"AGOSTO"},
    {numero: "09", nome:"SETEMBRO"},
    {numero: "10", nome:"OUTUBRO"},
    {numero: "11", nome:"NOVEMBRO"},
    {numero: "12", nome:"DEZEMBRO"},
    {numero: "1", nome:"JANEIRO"},
    {numero: "2", nome:"FEVEREIRO"},
    {numero: "3", nome:"MARÇO"},
    {numero: "4", nome:"ABRIL"},
    {numero: "5", nome:"MAIO"},
    {numero: "6", nome:"JUNHO"},
    {numero: "7", nome:"JULHO"},
    {numero: "8", nome:"AGOSTO"},
    {numero: "9", nome:"SETEMBRO"},    
  ]

  mensalidades: MensalidadeDTO[];
  mensalidadesFiltradas: MensalidadeDTO[];
  mensalidade: MensalidadeDTO;
  apartamento: ApartamentoDTO;
  valorTotalPago: number = 0;
  emAberto: number = 0;
  chave: boolean = true;
  apenasAberto: boolean = false;
  eventos: Evento[];
  evento: Evento;
  data: string = '';
  documentos : DocumentoDTO [];
  pagamentoSinalizado: boolean = false;
  protocoloSinalizarPagamento: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mensalidadeService: MensalidadeService) {
      this.valorTotalPago = 0;
      this.emAberto = 0;
      if(navParams.get('apartamento')){
        this.apartamento = navParams.get('apartamento');
      }
      if(navParams.get('mensalidades')){
        this.anosCons = [];
        this.mensalidades = navParams.get('mensalidades');
        this.mensalidades.forEach(m => {
          this.eventos = m.eventos;
          if(this.eventos){
            this.eventos.forEach(e => {
              if(e.tipo === 2){ 
                this.evento = e;
                if(this.evento && this.evento.dt_evento){
                  let format = new Date(this.evento.dt_evento); 
                   let dia  = format.getDate().toString(),
                  diaF = (dia.length == 1) ? '0'+dia : dia,
                  mes  = (format.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                  mesF = (mes.length == 1) ? '0'+mes : mes,
                  anoF = format.getFullYear();
                  this.data = diaF+"/"+mesF+"/"+anoF; 
                  
                }
              }
            });
          }
          if(!this.anos.find(x => x ===m.ano)){
            this.anos.push(m.ano);
          }
          if(!m.aberto && m.ano == (new Date).getFullYear() + ''){
            this.valorTotalPago = this.valorTotalPago + m.valor;
          }  else {
            if(m.aberto){
              this.emAberto = this.emAberto + 1;
            }
            
          }     
        });
        this.anosCons = this.anos;
        this.anosCons.sort(function(a,b) {
          return a < b ? 1 : a > b ? -1 : 0;
        });
        this.anos =[];        
        this.mensalidadesFiltradas = this.mensalidades.filter(x => {
          return this.filtrarAno(x,null);
        });
        this.mensalidadesFiltradas.sort(this.orderByMensalidade);
      }else{
        this.mensalidadeService.findAll().subscribe(response => {
          this.mensalidades = response;
          this.mensalidades.forEach(m => {
            if(!this.anos.find(x => x ===m.ano)){
              this.anos.push(m.ano);
            }
            if(!m.aberto){
              this.valorTotalPago = this.valorTotalPago + m.valor;
            }  else {
              this.emAberto = this.emAberto + 1;
            }     
          });
          this.anosCons = this.anos;
          this.mensalidadesFiltradas = this.mensalidades.filter(x => {
            return this.filtrarAno(x,null);
          });
          
        },
        error => {
          console.log(error.statusText);
          if(error.status === 403){
            console.log(error);
            this.navCtrl.setRoot("LoginPage");
          }
        });
      }
      
  }

  ionViewDidLoad() {
    
  }

  filtrar(mesNumber: string){
    var retorno: Mes[] = this.filtroMes.filter(f => {
      if (f.numero == mesNumber){
        return f.nome;
      }
    }); 
    if(retorno && retorno.length > 0) {
      return retorno[0].nome;
    }else {
      return '';
    }
    
  }

  filtrarAno(mensalidade: MensalidadeDTO,anosEscolhidos:string[]){
    if(anosEscolhidos === null){
      anosEscolhidos = [];
      anosEscolhidos.push((new Date).getFullYear() + '');
    }
    if(anosEscolhidos.find(x => x ===mensalidade.ano)){
      return mensalidade;
    }

  }

  filtrarApenasEmAberto(mensalidade: MensalidadeDTO){
     if(mensalidade.aberto){
       return mensalidade;
     }
  }

  detalhar(mensalidade: MensalidadeDTO) {
    this.mensalidade = mensalidade;
    this.chave = false;
    if(this.mensalidade){
      this.mensalidadeService.findDocumentosPorPeriodo(this.mensalidade.mes,
        this.mensalidade.ano, this.apartamento.id).subscribe(
          response => {
            this.documentos = response;
          },
          error => {

          }
        );
      /* this.mensalidadeService.findApartamento(this.mensalidade.id).
        subscribe(response =>{
          this.apartamento = response;
          
          
        },
        error => {
          if(error.status === 403){
            console.log(error);
            this.navCtrl.setRoot("LoginPage");
          }
        }); */
        this.pagamentoSinalizado = false;
        this.protocoloSinalizarPagamento = '';
        
        if(this.mensalidade.eventos && this.mensalidade.eventos.length > 0){
          this.mensalidade.eventos.forEach(e =>{
            if(e.tipo == 1){
              this.pagamentoSinalizado = true;
              this.protocoloSinalizarPagamento = e.protocolo;
            }
          });
        }        
    }
    //this.navCtrl.setRoot("DetalhecondominioPage");
  }
  onChave(mostrar: boolean){
    this.chave = mostrar;
  }
   
  atualizarLista(){
    if(this.apenasAberto){
      this.apenasAberto = false;
    }
    this.mensalidadesFiltradas = this.mensalidades.filter(x => {
      return this.filtrarAno(x,this.anos);
    });
    
  }

  onMostrarAberto(event: boolean){
    this.anos = [];
    this.apenasAberto = true;
    this.mensalidadesFiltradas = this.mensalidades.filter(this.filtrarApenasEmAberto);
  }

  orderByMensalidade(arg1: MensalidadeDTO, arg2:MensalidadeDTO){
    if(arg1.ano > arg2.ano){
      return 1;
    }else if(arg1.ano < arg2.ano){
      return -1;
    }else {
      if(arg1.mes > arg2.mes){
        return 1;
      }else {
        return -1;
      }
    }
  }
}
