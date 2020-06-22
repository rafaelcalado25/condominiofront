import { Component } from '@angular/core';
import { IonicPage, NavController,  MenuController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../services/auth.service';
import { CredenciaisDTO } from '../../models/shared/credenciais.dto';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credenciais: CredenciaisDTO = {
    username: '',
    password: ''
  };
  constructor(public navCtrl: NavController, public menu: MenuController,
    public auth: AuthService) {}

  login() {
    this.auth.authenticate(this.credenciais)
      //.map(res => res.json())
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get(API_CONFIG.NM_SECURITY_AUTHENTICATION_NAME));
        this.navCtrl.setRoot('HomePage');
        
      },
      error => {

        console.log(error);
      });   
    
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      //.map(res => res.json())
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get(API_CONFIG.NM_SECURITY_AUTHENTICATION_NAME));
        this.navCtrl.setRoot('HomePage');
        
      },
      error => {

        console.log(error);
      });   
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  resetarSenha(){
    if(this.credenciais && this.credenciais.username && this.credenciais.username !== ""){
      this.auth.resetarSenhaUsuario(this.credenciais.username).subscribe(
        response => {
          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );
    }
  }

}
