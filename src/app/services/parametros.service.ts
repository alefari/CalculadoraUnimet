import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Params { asignaturaPre: number,
                          inscripcionPre: number,
                          seguroPre: number,
                          tasa: number,
                          fechaIngreso: Date,
                          fechaVencimiento: Date,
                        }

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  // parametrosCollection: AngularFirestoreCollection;
  // parametros: Observable;

  private paramsDoc: AngularFirestoreDocument<Params>;
  params: Observable<Params>;

  constructor(private readonly afs: AngularFirestore) {

    this.paramsDoc = afs.doc<Params>('parametros/params');
    this.params = this.paramsDoc.valueChanges();

    // this.parametrosCollection = afs.collection('parametros');
    // this.parametros = this.parametrosCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // )
  }

  update(params: Params) {
    this.paramsDoc.update(params);
  }

  obtenerParametros() {
    return this.params;
  }


}
