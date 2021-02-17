import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { MainComponent } from './components/main/main.component';
import { EdicionComponent } from './edicion/edicion.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin', component: EdicionComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
