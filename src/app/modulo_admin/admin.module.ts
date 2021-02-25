import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EdicionComponent } from './components/edicion/edicion.component';
import { AddComponent } from './components/edicion/add/add.component';
import { EditarComponent } from './components/edicion/editar/editar.component';
import { ParametrosComponent } from './components/edicion/parametros/parametros.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EdicionComponent,
    AddComponent,
    EditarComponent,
    ParametrosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    FontAwesomeModule,
  ]
})
export class AdminModule { }
