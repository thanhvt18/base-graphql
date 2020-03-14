import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlertLayoutComponent} from './components/alert-layout/alert-layout.component';

const routes: Routes = [
  { path: '', component: AlertLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
