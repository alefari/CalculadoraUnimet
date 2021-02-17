import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.auth.usuario$.pipe(
        take(1),
        map(user => user && user.roles.admin ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            console.log('Acceso Denegado - Solo Administradores')
            this.auth.googleLogin();
            // this.router.navigate(['admin']);
          }
        })
      );
    }

}
