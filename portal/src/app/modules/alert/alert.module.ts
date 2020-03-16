import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertLayoutComponent } from './components/alert-layout/alert-layout.component';

import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [AlertLayoutComponent],
  imports: [
    CommonModule,
    AlertRoutingModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class AlertModule { }
