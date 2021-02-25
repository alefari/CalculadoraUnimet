import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { BecasService } from 'src/app/services/becas.service';
import { Beca } from 'src/app/models/beca.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('a') form: NgForm;
  porcentajes: string[] = ['0'];
  cantidadPorcentajes = 1;
  faPlus = faPlus;
  faMinus = faMinus;
  nuevaBeca: Beca;

  constructor(private becaService: BecasService) { }

  ngOnInit(): void { }

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

    this.onSalir();
  }

  agregarCampo() {
    this.cantidadPorcentajes++;
    this.porcentajes.push('0');
  }
  eliminarCampo() {
    this.cantidadPorcentajes--;
    this.porcentajes.pop();
  }

  repetirNVeces(n: any) {
    return[...Array(n).keys()];
  }

  onSalir() {
    this.form.reset();
    this.cantidadPorcentajes = 1;
    this.porcentajes = ['0']
    this.nuevaBeca = null;
  }

}
