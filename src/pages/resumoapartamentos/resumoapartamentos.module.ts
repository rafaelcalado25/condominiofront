import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumoapartamentosPage } from './resumoapartamentos';
import { ConsolidadoedificioComponent } from '../../components/consolidadoedificio/consolidadoedificio';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    ResumoapartamentosPage, ConsolidadoedificioComponent,
  ],
  imports: [
    IonicPageModule.forChild(ResumoapartamentosPage),
    TooltipsModule.forRoot(),
  ],
})
export class ResumoapartamentosPageModule {}
