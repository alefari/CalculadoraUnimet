import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { AddComponent } from './components/edicion/add/add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EdicionComponent } from './components/edicion/edicion.component';
import { EditarComponent } from './components/edicion/editar/editar.component';
import { ParametrosComponent } from './components/edicion/parametros/parametros.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    EdicionComponent,
    AddComponent,
    EditarComponent,
    ParametrosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
