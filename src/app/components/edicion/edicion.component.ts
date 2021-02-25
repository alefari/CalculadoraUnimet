import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faTrashAlt, faEyeSlash, faInfo, faPlus, faEye, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Form, NgForm } from '@angular/forms';
import { Beca } from 'src/app/models/beca.model';
import { BecasService } from 'src/app/services/becas.service';

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
  faClipboardList = faClipboardList;
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
    beca.habilitado = false;
    this.servicioBecas.editarBeca(beca);
  }
  onHabilitar(beca: Beca) {
    beca.habilitado = true;
    this.servicioBecas.editarBeca(beca);
  }

  detallesBeca(idBeca: string) {
    if(this.detalles == idBeca) {
      this.detalles = "";
    }
    else{
      this.detalles = idBeca;
    }
  }

  abrirModalEdicion(beca: Beca) {
    this.becaEditar = Object.assign({}, beca);
  }

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

  // agregarCampo() {
  //   this.becaEditar.porcentajes.push("0");
  // }
  // eliminarCampo() {
  //   this.becaEditar.porcentajes.pop();
  // }

  // repetirNVeces(n: any) {
  //   return[...Array(n).keys()];
  // }

}
