import { Component } from '@angular/core';
import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  standalone: false,
  
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

    public countries: Country[] = [] ;
  
    constructor( private countriesService: countriesService ){ }
  
    searchByRegion( term: string ):void{
  
      this.countriesService.searchRegion( term )
        .subscribe( countries => {
          this.countries = countries ;
        }) ;
  
    }
  

}
