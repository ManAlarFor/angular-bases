import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap,  } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class countriesService {
    constructor( private http: HttpClient ) { 

        this.loadFromLocalStorage()

    }

    private apiUrl: string = "https://restcountries.com/v3.1" ;

    private saveInLocalStorage() {
        localStorage.setItem( "cacheStore", JSON.stringify( this.cacheStore ))
    }
    private loadFromLocalStorage() {
        if( localStorage.getItem("cacheStore") ){
            this.cacheStore = JSON.parse( localStorage.getItem("cacheStore")! )
        }
    }

    public cacheStore:CacheStore = {

        byCapital: {term: "", countries: []},
        byCountry: {term: "", countries: []},
        byRegion: {region: "", countries: []}

    }

    private getCountriesRequest( url: string ): Observable<Country[]> {

        return this.http.get<Country[]>( url )
            .pipe(
                catchError( () => of([])),
                delay(1500)
            )

    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {

        return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${ code }`)
                .pipe(

                    map( countries => countries.length > 0 ? countries[0]: null),
                    catchError( () => of(null))

                ) ;
    }

    searchCapital( term: string ):Observable<Country[]> {

        let url: string = `${ this.apiUrl }/capital/${ term }` ;

        return this.getCountriesRequest(url)
                .pipe(

                    tap( countries => this.cacheStore.byCapital = { term, countries } ),
                    tap( () => this.saveInLocalStorage() )

                ) ;
        
    }

    searchCountry( term: string ):Observable<Country[]> {

        let url: string = `${ this.apiUrl }/name/${ term }` ;

        return this.getCountriesRequest(url)                
                .pipe(

                    tap( countries => this.cacheStore.byCountry = { term, countries } ),
                    tap( () => this.saveInLocalStorage() )

                ) ;
        
    }
    
    searchRegion( term: Region ):Observable<Country[]> {

        let url: string = `${ this.apiUrl }/region/${ term }` ;

        return this.getCountriesRequest(url) 
            .pipe(

                tap( countries => this.cacheStore.byRegion = { region: term , countries } ),
                tap( () => this.saveInLocalStorage() )

            ) ;

        
    }
    
}