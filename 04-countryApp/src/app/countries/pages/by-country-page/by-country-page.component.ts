import { Component } from '@angular/core';

import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  standalone: false,
  
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  public countries: Country[] = [] ;

  constructor( private countriesService: countriesService ){ }

  searchByCountry( term: string ):void{

    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries ;
      }) ;

  }
}
