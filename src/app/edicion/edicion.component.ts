import { Component, OnInit, ViewChild } from '@angular/core';
import { BecasService } from '../services/becas.service';
import { Beca } from '../models/beca.model';
import { faEdit, faTrashAlt, faEyeSlash, faInfo, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {
  @ViewChild('a') form: NgForm;
  becas: Beca[];
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faInfo = faInfo;
  faPlus = faPlus;
  detalles: string = "";
  cantidadPorcentajes: number = null;

  becaEditar: Beca = {
    id: null,
    nombre: null,
    porcentajes: null,
    aplicaSeguro: false,
    aplicaInscripcion: false,
    matMax: null
  }

  constructor(private servicioBecas: BecasService) { }

  ngOnInit(): void {
    this.servicioBecas.obtenerItems().subscribe(becas => {
      this.becas = becas.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
      //this.becas.unshift(new Beca('0', 'Ninguna', null, false, false, null));
    })
  }

  onEliminar(beca: Beca) {
    this.servicioBecas.eliminarBeca(beca.id);
  }

  onInhabilitar(beca: Beca) {
    let becaInhabilitada = beca;
    becaInhabilitada.habilitado = false;
    this.servicioBecas.editarBeca(becaInhabilitada);
  }
  onHabilitar(beca: Beca) {
    let becaHabilitada = beca;
    becaHabilitada.habilitado = true;
    this.servicioBecas.editarBeca(becaHabilitada);
  }

  detallesBeca(idBeca: string) {
    if(this.detalles == idBeca) {
      this.detalles = "";
    }
    else{
      this.detalles = idBeca;
    }
  }

  abrirModalEdicion(idBeca: string) {
    this.becaEditar = this.becas.find(beca => beca.id === idBeca);
  }

  editarBeca() {
    this.becaEditar.nombre = this.form.value.nombre;
    this.servicioBecas.editarBeca(this.becaEditar);

    this.becaEditar = {
      id: null,
      nombre: null,
      porcentajes: null,
      aplicaSeguro: false,
      aplicaInscripcion: false,
      matMax: null
    }
  }

  agregarCampo() {
    this.becaEditar.porcentajes.push("0");
  }
  eliminarCampo() {
    this.becaEditar.porcentajes.pop();
  }

  repetirNVeces(n: any) {
    return[...Array(n).keys()];
  }

}
