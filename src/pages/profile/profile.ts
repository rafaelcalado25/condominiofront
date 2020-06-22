import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LocalUser } from '../../models/shared/local_user';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioPessoaDTO } from '../../models/shared/usuariopessoa.dto';
import { UsuarioNewDTO } from '../../models/shared/usuarionew.dto';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: LocalUser;
  usuario: UsuarioPessoaDTO = {username:'', email: '', nome:''};
  disable = true;
  enableTelefone = false;
  novoTelefone: number;
  senhaAtual: string;
  senhaNova: string;
  confirmacaoSenha: string;
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storageService: StorageService, private usuarioService: UsuarioService,
    private loadingController:LoadingController,private toastCtrl: ToastController ) {

    this.user = this.storageService.getLocalUser();
    if(this.user && this.user.username){
      this.usuarioService.consultarPorUsername(this.user.username).subscribe(
        response => {
          this.usuario = response;
          
        }, 
        error =>{
          this.presentToastError(error.message);
        }
      );
    }
  }

  ionViewDidLoad() {
    
  }

  addPhone(){
    this.enableTelefone = true;
    
  }

  atualizarProfile(){
    this.loading = this.loadingController.create({ content: "Processando alteração..." });
    this.loading.present(); 
    this.usuarioService.atualizarProfile(this.usuario).subscribe(
      response => {
        this.loading.dismiss();
        this.presentToastSucess('Profile salvo com sucesso!');
      },
      error => {
        this.loading.dismiss()
        this.presentToastError(error.message);
      }
    );
  }

  atualizarSenha(){
    let user: UsuarioNewDTO;
    this.loading = this.loadingController.create({ content: "Processando alteração..." });
    this.loading.present(); 
    if(this.senhaNova == this.confirmacaoSenha){
      user= {id:this.usuario.id, username:this.usuario.username,
        password:this.senhaNova};
        this.usuarioService.atualizarSenha(user).subscribe(
          response => {
            this.loading.dismiss();
            this.presentToastSucess('Troca de senha efetuada com sucesso!');
          },
          error => {
            this.loading.dismiss()
            this.presentToastError(error.message);
          }
        );
    }
    
  }

  inserirTelefone(){
    if(this.usuario){
      if(!this.usuario.telefones){
        this.usuario.telefones = [];
      }
      this.usuario.telefones.push(this.novoTelefone+'');
      this.novoTelefone = null;
    }
  }
  dismissTelefone(){
    this.enableTelefone = false;
  }

  eliminarTelefone(index: number){
    this.usuario.telefones.splice(index,1);
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
  

}
