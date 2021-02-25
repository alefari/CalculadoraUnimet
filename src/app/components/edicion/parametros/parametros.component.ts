import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private servicioParametros: ParametrosService) { }

  ngOnInit(): void {
    this.servicioParametros.obtenerParametros().subscribe(params => {
      this.parametros = params;
      this.paramsLoaded = true;
      console.log(this.parametros)
    })
    this.fechaActual = new Date();

    this.fechaMin = this.fechaActual.toISOString().substring(0, 16);
    this.fechaMax = new Date(this.fechaActual.getTime() + 31536000000).toISOString().substring(0, 16);
    // this.fechaMin = this.fechaActual.toISOString().split('.')[0];

  }

  onSalir() {

  }

  onSubmit() {
    this.parametros.fechaVencimiento = new Date(this.form.value.fechaVencimiento).getTime();
    this.parametros.fechaIngreso = new Date().getTime();
    this.servicioParametros.update(this.parametros);
    console.log(this.parametros)
  }

}
