import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultabalancoPage } from './consultabalanco';
import { CdetalhecontabilComponent } from '../../components/cdetalhecontabil/cdetalhecontabil';

@NgModule({
  declarations: [
    ConsultabalancoPage, CdetalhecontabilComponent, 
  ],
  imports: [
    IonicPageModule.forChild(ConsultabalancoPage),
  ],
})
export class ConsultabalancoPageModule {}
