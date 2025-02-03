import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

    constructor( 
        private authService: AuthService,
        private router: Router
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean> {

        return this.authService.checkAuth()
            .pipe(

                tap( isAuth => {

                    if( isAuth ) {

                        this.router.navigateByUrl("/") ;

                    }

                } ),
                map( isAuth => !isAuth )

            )

    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

        return this.checkAuthStatus() ;
        
    }
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        
        return this.checkAuthStatus() ;

    }

    
    
}