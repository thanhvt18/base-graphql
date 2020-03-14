import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'alert',
    pathMatch: 'full'
  },
  {
    path: 'alert',
    loadChildren: () => import('./modules/alert/alert.module').then(m => m.AlertModule)
  },
  {
    path: 'case',
    loadChildren: () => import('./modules/case/case.module').then(m => m.CaseModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
