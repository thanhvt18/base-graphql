import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertLayoutComponent } from './components/alert-layout/alert-layout.component';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateAlertComponent } from './components/create-alert/create-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [AlertLayoutComponent, CreateAlertComponent],
  imports: [
    CommonModule,
    AlertRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [CreateAlertComponent],
})
export class AlertModule {}
