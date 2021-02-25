import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicionComponent } from './components/edicion/edicion.component';

const routes: Routes = [
  {path: '', component: EdicionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
