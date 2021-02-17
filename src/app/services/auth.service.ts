import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario$: Observable<Usuario>

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    // OBTENER LA DATA DEL AUTH, LUEGO EL DOCUMENTO DEL USUARIO DE FIRESTORE // NULL
    this.usuario$ = this.afAuth.authState.pipe(
      switchMap(usuario => {
        if(usuario) {
          return this.afs.doc<Usuario>(`usuarios/${usuario.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  googleLogin() {
    this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider())
      .then((credential) => {
        this.updateUserData(credential.user)
      });
  }

  private updateUserData(usuario) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${usuario.uid}`);
    const data: Usuario = {
      uid: usuario.uid,
      email: usuario.email,
      displayName: usuario.displayName,
      photoURL: usuario.photoURL,
      roles: {
        usuario: true
      }
    }
    return userRef.set(data, {merge: true})
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    console.log('signedOut')
  }

  puedeEditar(usuario: Usuario): boolean {
    const allowed = ["admin"];
    return this.checkAuthorization(usuario, allowed);
  }

  private checkAuthorization(usuario: Usuario, allowedRoles: string[]): boolean {
    if (!usuario) return false
    for(const role of allowedRoles) {
      if(usuario.roles[role]) {
        return true
      }
    }
    return false
  }
}
