import { NgModule } from '@angular/core';
import { ConsolidadoindividualComponent } from './consolidadoindividual/consolidadoindividual';
import { CdatalhecondominioComponent } from './cdetalhecondominio/cdetalhecondominio';
import { ConsolidadoedificioComponent } from './consolidadoedificio/consolidadoedificio';
import { TooltipsModule } from 'ionic-tooltips';
import { CdetalhecontabilComponent } from './cdetalhecontabil/cdetalhecontabil';

@NgModule({
	declarations: [ConsolidadoindividualComponent,
    CdatalhecondominioComponent,
    ConsolidadoedificioComponent,
    CdetalhecontabilComponent,
    ],
	imports: [ TooltipsModule.forRoot()],
	exports: [ConsolidadoindividualComponent,
    CdatalhecondominioComponent,
    ConsolidadoedificioComponent,
    CdetalhecontabilComponent,
    ]
})
export class ComponentsModule {}
