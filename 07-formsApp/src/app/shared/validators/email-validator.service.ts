import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        
        const email = control.value ;

        const httpCallObservable = new Observable<ValidationErrors | null>( ( subscriber ) => {

            if( email === "fernando@google.com") {

                subscriber.next({ emailTaken: true }) ;
                subscriber.complete() ;

            } else {

                subscriber.next(null) ;
                subscriber.complete() ;

            }

        }).pipe(
            delay( 1000 )
        ) ;

        return httpCallObservable ;

    }

    
}