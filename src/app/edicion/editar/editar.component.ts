import { Component, OnInit, Input } from '@angular/core';
import { Beca } from 'src/app/models/beca.model';
import { BecasService } from 'src/app/services/becas.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  becas: Beca[];
  @Input() idBeca: string;
  constructor(private becaService: BecasService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.becaService.obtenerItems().subscribe(becas => {
      this.becas = becas;
    })


  }

  onSubmit() {

  }

  agregarCampo() {

  }
}
