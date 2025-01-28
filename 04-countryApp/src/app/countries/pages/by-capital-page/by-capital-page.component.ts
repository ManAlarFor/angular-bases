import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { countriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,
  
  templateUrl: './by-capital-page.component.html',
})

export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [] ;
  public isLoading: boolean = false ;
  public initialValue: string = "" ;

  constructor( private countriesService: countriesService ){ }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries
    this.initialValue = this.countriesService.cacheStore.byCapital.term
  }

  searchByCapital( term: string ):void{

    this.isLoading = true ;
    
    this.countriesService.searchCapital( term )
    .subscribe( countries => {
      this.countries = countries ;
      this.isLoading = false ;
      }) ;

  }

}
