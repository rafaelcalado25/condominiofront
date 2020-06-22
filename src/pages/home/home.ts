import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular/navigation/ionic-page";
import { Events, NavController } from "ionic-angular";
import { UsuarioService } from "../../services/domain/usuario.service";
import { StorageService } from "../../services/storage.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  constructor(public navCtrl: NavController, private usuarioService: UsuarioService,
    private events: Events, private storage : StorageService) {
    
      this.usuarioService.getNavUsuario().subscribe(
        response => {
          if(response && response.length > 0){
            this.storage.setNavUsuario(response);
            this.events.publish('teste: nav', response);
          }else{
            this.navCtrl.setRoot("LoginPage");
          }
          
        },
        error =>{
          this.navCtrl.setRoot("LoginPage");
        }
      );
      
    }
  
}
