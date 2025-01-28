import { Component, OnInit } from '@angular/core';

import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  standalone: false,
  
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [] ;
  public isLoading: boolean = false ;
  public initialValue: string = "" ;

  constructor( private countriesService: countriesService ){ }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries
    this.initialValue = this.countriesService.cacheStore.byCountry.term
  }

  searchByCountry( term: string ):void{

    this.isLoading = true ;

    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries ;
        this.isLoading = false ;

      }) ;

  }
}
