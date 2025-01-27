import { Component, EventEmitter, Output } from '@angular/core';
import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,
  
  templateUrl: './by-capital-page.component.html',
})

export class ByCapitalPageComponent {

  public countries: Country[] = [] ;

  constructor( private countriesService: countriesService ){ }

  searchByCapital( term: string ):void{

    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries ;
      }) ;

  }

}
