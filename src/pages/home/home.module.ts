import { IonicPageModule } from 'ionic-angular/module';
import { HomePage } from './home';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage)    
  ]
})
export class HomeModule{}