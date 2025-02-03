import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl ;
  private user?: User ;

  constructor(
    private http: HttpClient,
  ) { }

  get currentUser(): User|undefined {

    if( this.user ) {

      return structuredClone( this.user ) ;

    } else {

      return undefined ;

    }

  }

  login( email: string, password: string ):Observable<User> {

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => {
          this.user = user ;
          localStorage.setItem('token', "hfaoisfhaof2312cf" ) ;
        })
      )

  }

  checkAuth(): Observable<boolean> {

    if( localStorage.getItem("token") ){

      const token = localStorage.getItem("token") ;

      return this.http.get<User>(`${ this.baseUrl }/users/1`)
        .pipe(
          tap( user => this.user = user ),
          map( user => !!user ),
          catchError( () => of(false) )
        )

    } else {

      return of(false) ;

    }

  }

  logout() {

    this.user = undefined ;

    localStorage.removeItem("token") ;

  }

}
