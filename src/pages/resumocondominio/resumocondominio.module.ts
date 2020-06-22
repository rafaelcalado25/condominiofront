import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumocondominioPage } from './resumocondominio';
import { ConsolidadoindividualComponent } from '../../components/consolidadoindividual/consolidadoindividual';
import { CdatalhecondominioComponent } from '../../components/cdetalhecondominio/cdetalhecondominio';

@NgModule({
  declarations: [
    ResumocondominioPage, ConsolidadoindividualComponent, CdatalhecondominioComponent
  ],
  imports: [
    IonicPageModule.forChild(ResumocondominioPage),
    
  ],
})
export class ResumocondominioPageModule {}
