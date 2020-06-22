import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MensalidadeService } from '../services/domain/mensalidades.service';
import { ApartamentoService } from '../services/domain/apartamentos.service';
import { CondominioService } from '../services/domain/condominios.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { DocumentoService } from '../services/domain/documento.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { BalancoService } from '../services/domain/balanco.service';
import { inserirlancamentobalanco } from '../pages/consultabalanco/consultabalanco';
import { RubricaService } from '../services/domain/rubrica.service';
import { LancamentoService } from '../services/domain/lancamento.service';

@NgModule({
  declarations: [
    MyApp, inserirlancamentobalanco
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),   
    BrowserAnimationsModule,  
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, inserirlancamentobalanco
  ],
  providers: [
    StatusBar, DocumentoService,
    SplashScreen, MensalidadeService, ApartamentoService, CondominioService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AuthService, StorageService, UsuarioService, BalancoService,
    RubricaService, LancamentoService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class AppModule {}
