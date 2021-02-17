import { Component, OnInit, ViewChild } from '@angular/core';
import { BecasService } from '../../services/becas.service';
import { Beca } from '../../models/beca.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('a') form: NgForm;
  porcentajes: string[] = [];
  faPlus = faPlus;
  cantidadPorcentajes = 1;
  nuevaBeca: Beca;

  constructor(private becaService: BecasService) { }

  ngOnInit(): void {
    this.cantidadPorcentajes = 1;
  }

  onSubmit() {
    this.nuevaBeca = {
      nombre: this.form.value.nombre,
      porcentajes: this.porcentajes,
      aplicaInscripcion: this.form.value.aplicaInscripcion,
      aplicaSeguro: this.form.value.aplicaSeguro,
      matMax: 0,
      habilitado: false
    }

    if(this.form.value.poseeLimite) {
      this.nuevaBeca.matMax = this.form.value.matMax;
    }

    this.becaService.agregarBeca(this.nuevaBeca);
    this.porcentajes = [];
  }

  repetirNVeces(n: any) {
    return[...Array(n).keys()];
  }

  agregarCampo() {
    this.cantidadPorcentajes++;
  }

}
