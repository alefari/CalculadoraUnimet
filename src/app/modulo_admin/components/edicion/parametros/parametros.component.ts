import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ParametrosService, Params } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  parametros: Params;
  paramsLoaded: boolean = false;
  fechaActual:Date;
  fechaMin:string;
  fechaMax:string;
  fechaPlaceholder:string;
  usuarioActual: Usuario;

  constructor(private servicioParametros: ParametrosService, private auth: AuthService) { }

  ngOnInit(): void {
    this.servicioParametros.obtenerParametros().subscribe(params => {
      this.parametros = params;
      this.paramsLoaded = true;
      this.fechaActual = new Date();
      // PROBLEMA CON FECHAPLACEHOLDER
      this.fechaMin = this.fechaActual.toISOString().substring(0, 16);
      this.fechaMax = new Date(this.fechaActual.getTime() + 31536000000).toISOString().substring(0, 16);
      this.fechaPlaceholder = new Date(this.parametros.fechaVencimiento).toISOString().substring(0, 16);
    })
    this.auth.usuario$.subscribe(usuario => {
      this.usuarioActual = usuario;
    })

    // this.fechaMin = this.fechaActual.toISOString().split('.')[0];

  }

  onSalir() {

  }

  onSubmit() {
    this.parametros.fechaVencimiento = new Date(this.form.value.fechaVencimiento).getTime();
    this.parametros.fechaIngreso = new Date().getTime();
    this.parametros.ultimaActualizacion = this.usuarioActual.displayName;
    this.servicioParametros.update(this.parametros);
  }

}
