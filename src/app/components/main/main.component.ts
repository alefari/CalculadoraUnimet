import { Component, OnInit, ViewChild } from '@angular/core';
import { Beca } from 'src/app/models/beca.model';
import { BecasService } from 'src/app/services/becas.service';
import { NgForm } from '@angular/forms';
import { ParametrosService, Params } from 'src/app/services/parametros.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  becas: Beca[];
  becasLoaded = false;

  parametros:Params;
  vigenciaTasa:Date;
  tasaValida = false;
  paramsLoaded = false;

  numBecaElegida: string[] = ['0', '0', '0'];

  porcentajesMostrar: any[] = [['0'], ['0'], ['0']]
  porcentajesElegidos: any[] = [null, null, null]

  @ViewChild('f') form1: NgForm;
  @ViewChild('f2') form2: NgForm;

  completadoPaso1 = false;
  completadoPaso2 = false;

  becasListas: Beca[] = [];

  datosForm = {
    materiasInscritas: 5,
    materiasReinscritas: 1,
    primerPago: false,
    reinscritas: false,
  }

  costoBruto: number;
  costoNeto: number;

  constructor(private servicioBecas: BecasService, private servicioParametros: ParametrosService, private analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
    this.servicioBecas.obtenerItems().subscribe(becas => {
      this.becas = becas.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
      this.becasLoaded = true;
    })
    this.servicioParametros.obtenerParametros().subscribe(params => {
      this.parametros = params
      this.vigenciaTasa = new Date(this.parametros.fechaVencimiento);
      this.tasaValida = this.parametros.fechaVencimiento > new Date().getTime() ? true : false;
      this.paramsLoaded = true;
    })
  }

  onSubmit1() {
    this.completadoPaso1 = true;
  }

  onSubmit2() {
    this.completadoPaso2 = true;
    this.becasListas = [];
    for (let index = 0; index < this.numBecaElegida.length; index++) {
      if(this.numBecaElegida[index] != '0') {
        this.becasListas.push(this.becas.find(beca => beca.id == this.numBecaElegida[index]));
        this.becasListas[index].porcentajes = [this.porcentajesElegidos[index]]
      }
    }
    this.calcularCostoBruto();
  }

  regresar2a1() {
    this.completadoPaso1 = false;
  }


  selectBeca(selector: number) {
    this.porcentajesMostrar[selector] = this.becas.find(beca => beca.id == this.numBecaElegida[selector]).porcentajes;
  }

  repetirNVeces(n: number) {
    return[...Array(+n).keys()];
  }

  botonPisado() {

  }

  calcularCostoBruto() {
    this.costoBruto = +(this.parametros.asignaturaPre * this.datosForm.materiasInscritas) + this.parametros.seguroPre;

    if (this.datosForm.primerPago == true) {
      this.costoBruto += this.parametros.inscripcionPre;
    }
    this.calcularCostoNeto();
  }

  calcularCostoNeto() {
    let inscripcionDescontada: number = this.parametros.inscripcionPre;
    let seguroDescontado: number = this.parametros.seguroPre;
    let costoParaTrabajar: number = this.costoBruto - this.parametros.seguroPre;
    let becasParaTrabajar: Beca[];

    becasParaTrabajar = this.becasListas.map(a => Object.assign({}, a));
    // becasParaTrabajar = this.becasListas.map(a => ({...a}));

    //SI HAY MATERIAS REINSCRITAS, QUITARLAS DEL MONTO A TRABAJAR
    if(this.datosForm.reinscritas == true) {
      costoParaTrabajar -= (this.datosForm.materiasReinscritas * this.parametros.asignaturaPre);
    }else {
      this.datosForm.materiasReinscritas = 0;
    }

    //SI ES EL PRIMER PAGO, QUITAR INSCRIPCION DEL MONTO A TRABAJAR
    if(this.datosForm.primerPago == true) {
      costoParaTrabajar -= this.parametros.inscripcionPre;
    }

    // SE COLOCAN LOS DESCUENTOS POR UC DE PRIMEROS
    becasParaTrabajar.forEach((beca, index) =>
      beca.porcentajes[0].includes("UC") &&
      becasParaTrabajar.unshift(becasParaTrabajar.splice(index,1)[0])
    )

    // PARA CADA BECA...
    for(let beca of becasParaTrabajar) {

      if(beca.porcentajes[0].includes("UC")){
        costoParaTrabajar -= (beca.porcentajes[0].replace('UC', '') * (this.parametros.asignaturaPre / 3));
      }

      else{
        //SI NO APLICAN MATERIAS MAXIMAS, SE APLICA EL DESCUENTO DE FORMA NORMAL
        if(beca.matMax == 0 || beca.matMax >= (this.datosForm.materiasInscritas-this.datosForm.materiasReinscritas)) {
          costoParaTrabajar -= (costoParaTrabajar * beca.porcentajes[0] / 100);

        //SI APLICAN MATERIAS MAXIMAS, SE DIVIDE EL MONTO ACTUAL ENTRE EL NUMERO DE MATERIAS INSCRITAS,
        // LUEGO ESO SE MULTIPLICA POR EL NUMERO DE MATERIAS QUE CUBRE LA BECA Y SE USA ESE MONTO PARA CALCULAR EL DESCUENTO
        }else if(beca.matMax < (this.datosForm.materiasInscritas-this.datosForm.materiasReinscritas)) {
          costoParaTrabajar -= (costoParaTrabajar / (this.datosForm.materiasInscritas-this.datosForm.materiasReinscritas) * beca.matMax * beca.porcentajes[0] / 100);
        }

        // SI LA BECA APLICA AL SEGURO, SE HACE EL DESCUENTO
        if(beca.aplicaSeguro == true) {
          seguroDescontado -= (seguroDescontado * beca.porcentajes[0] / 100);
        }

        //SI LA BECA APLICA A LA INSCRIPCION, Y ES EL PRIMER PAGO SE HACE EL DESCUENTO
        if(beca.aplicaInscripcion == true && this.datosForm.primerPago == true) {
          inscripcionDescontada -= (inscripcionDescontada * beca.porcentajes[0] / 100);
        }

      }
    }

    //AL FINALIZAR, SE GUARDA EL COSTO NETO EN SU VARIABLE
    this.costoNeto = +costoParaTrabajar + +seguroDescontado;

    //SI ERA EL PRIMER PAGO O HABIAN MATERIAS REINSCRITAS, SE SUMAN ESOS COSTOS NUEVAMENTE AL COSTO NETO
    if(this.datosForm.primerPago == true) {
      this.costoNeto += +inscripcionDescontada;
    }
    if(this.datosForm.reinscritas == true) {
      this.costoNeto += (this.datosForm.materiasReinscritas * this.parametros.asignaturaPre);
    }

    //SE REDONDEA EL COSTO NETO A 2 DECIMALES
    this.costoNeto = +this.costoNeto.toFixed(2);

    if(this.costoNeto < 0) {
      this.costoNeto = 0;
    }

    //SE REGISTRA EL EVENTO DE MOSTRAR RESULTADOS EN ANALYTICS
    // this.analytics.logEvent('Resultados', {
    //   Materias: this.datosForm.materiasInscritas,
    //   Reinscritas: this.datosForm.materiasReinscritas,
    //   Costo_Materia: this.parametros.asignaturaPre,
    //   Costo_Inscripcion: this.parametros.inscripcionPre,
    //   Costo_Seguro: this.parametros.seguroPre,
    //   Costo_Bruto: this.costoBruto,
    //   Costo_Neto: this.costoNeto,
    //   Becas: this.generarStringBecas()
    // });
    console.log('Resultados', {
      Materias: this.datosForm.materiasInscritas,
      Reinscritas: this.datosForm.materiasReinscritas,
      Costo_Materia: this.parametros.asignaturaPre,
      Costo_Inscripcion: this.parametros.inscripcionPre,
      Costo_Seguro: this.parametros.seguroPre,
      Costo_Bruto: this.costoBruto,
      Costo_Neto: this.costoNeto,
      Total_Descuento: parseFloat((this.costoBruto - this.costoNeto).toFixed(2)),
      Becas: this.generarStringBecas()
    });
  }

  generarStringBecas():string {
    let becasString:string = '';
    this.becasListas.forEach(beca => {
      becasString = becasString + beca.nombre + '(' + beca.porcentajes[0] + '%),' + " ";
    });
    return becasString;
  }

}
