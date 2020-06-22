import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../services/domain/usuario.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'LoginPage';

  pages: Array<{title: string, component: string, 
    subPages:[{title: string, component:string}]}> = [];

  lista  = new Map();
  


  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, public usuarioService: UsuarioService,
    events: Events) {
    this.initializeApp(); 
    this.lista.set('HomePage','Home');
    this.lista.set('ResumoapartamentosPage','Resumo Apartamentos');
    this.lista.set('ConfimarpagamentoPage','Confirmar Pagamento');
    this.lista.set('GerarmensalidadePage','Gerar Mensalidade');
    this.lista.set('ConsultabalancoPage','Consultar Balanço');
    this.lista.set('ProfilePage','Profile');
    events.subscribe('teste: nav', (navUsuario:String[])=>{
      this.pages = [
        { title: 'Home', component: 'HomePage',  subPages:null  },
        { title: 'Profile', component: 'ProfilePage',  subPages:null  }];
      navUsuario.forEach( nav => {
        if(nav!='HomePage' && nav!='ProfilePage'){
          this.pages.push({ title: this.lista.get(nav), component: nav+'',  subPages:null  } );
        }        
      });
    });
    // used for an example of ngFor and navigation
    /* this.pages = [
      { title: 'Home', component: 'HomePage',  subPages:null  }  ,
      { title: 'Resumo Apartamentos', component: 'ResumoapartamentosPage', subPages:null },
      { title: 'Confirmar Pagamento', component: 'ConfimarpagamentoPage',
        subPages: null }  ,
      { title: 'Gerar Mensalidade', component: 'GerarmensalidadePage', subPages:null }   
    ]; */

  }

  ionViewDidLoad(){
    
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
