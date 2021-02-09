import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Beca } from '../models/beca.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BecasService {
  becasCollection: AngularFirestoreCollection<Beca>;
  becas: Observable<Beca[]>;

  // public seleccionado: Beca = {
  //   id: "",
  //   nombre: '',
  //   porcentajes: [],
  //   aplicaInscripcion: null,
  //   aplicaSeguro: null,
  //   matMax: null,
  //   habilitado: false,
  // }

  constructor(private readonly afs: AngularFirestore) {

    this.becasCollection = afs.collection<Beca>('becas');
    this.becas = this.becasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Beca;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  obtenerItemPorId(coleccion: string, id: string) {
    return this.afs.collection(coleccion, ref => ref.where('id', '==', id));
  }

  obtenerItems() {
    return this.becas;
  }

  agregarBeca(beca: Beca) {
    this.becasCollection.add(beca);
  }

  editarBeca(beca: Beca) {
    return this.becasCollection.doc(beca.id).update(beca);
  }

  eliminarBeca(id: string) {
    return this.becasCollection.doc(id).delete();
  }
}
