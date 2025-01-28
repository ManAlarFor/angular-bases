import { Component, OnInit } from '@angular/core';
import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  standalone: false,
  
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

    public countries: Country[] = [] ;
    public continents: Region[] = ["Africa", "America", "Asia", "Europe", "Oceania", "Antarctic"]
    public initialRegion?: Region ;
    public selectedRegion?: Region ;

    public isLoading:boolean = false ;

  
    constructor( private countriesService: countriesService ){ }

    ngOnInit(): void {
      this.countries = this.countriesService.cacheStore.byRegion.countries
      this.selectedRegion = this.countriesService.cacheStore.byRegion.region
    }
  
    searchByRegion( continent: Region ):void{

      this.selectedRegion = continent ;

      this.isLoading = true ;
  
      this.countriesService.searchRegion( continent )
        .subscribe( countries => {
          this.countries = countries ;
          this.isLoading = false ;

        }) ;
  
    }
  

}
