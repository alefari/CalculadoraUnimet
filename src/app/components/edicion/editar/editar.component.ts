import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { BecasService } from 'src/app/services/becas.service';
import { Beca } from 'src/app/models/beca.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit, OnChanges {
  @ViewChild('a') form: NgForm;
  cantidadPorcentajes = 1;
  faPlus = faPlus;
  faMinus = faMinus;
  poseeLimiteMat = false;

  @Input() becaEditar: Beca;
  becaEditable: Beca;

  constructor(private becaService: BecasService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.becaEditable = JSON.parse(JSON.stringify(this.becaEditar));
    if(this.becaEditable.matMax == 0) {
      this.poseeLimiteMat = false;
    }
    else{
      this.poseeLimiteMat = true;
    }
    if(this.becaEditable.porcentajes) {
      this.cantidadPorcentajes = this.becaEditable.porcentajes.length ?? 1;
    }

  }

  onSubmit() {

    if(this.poseeLimiteMat == true) {
      this.becaEditable.matMax = this.form.value.matMax;
    }
    else{
      this.becaEditable.matMax = 0;
    }

    this.becaService.editarBeca(this.becaEditable);
  }

  agregarCampo() {
    this.cantidadPorcentajes++;
    this.becaEditable.porcentajes.push('0');
  }
  eliminarCampo() {
    this.cantidadPorcentajes--;
    this.becaEditable.porcentajes.pop();
  }

  repetirNVeces(n: any) {
    return[...Array(n).keys()];
  }

  onSalir() { }

  // editarBeca() {
  //   this.becaEditar.nombre = this.form.value.nombre;
  //   this.servicioBecas.editarBeca(this.becaEditar);

  //   this.becaEditar = {
  //     id: null,
  //     nombre: null,
  //     porcentajes: null,
  //     aplicaSeguro: false,
  //     aplicaInscripcion: false,
  //     matMax: null
  //   }
  // }
}
