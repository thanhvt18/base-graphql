import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertLayoutComponent } from './components/alert-layout/alert-layout.component';


@NgModule({
  declarations: [AlertLayoutComponent],
  imports: [
    CommonModule,
    AlertRoutingModule
  ]
})
export class AlertModule { }
