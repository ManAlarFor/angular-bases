import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private _tagsHistory: string[] = [] ;

  constructor() { };

  get tagsHistory() {

    return [...this._tagsHistory] ;

  }

  searchTag(tag:string) {

    tag = tag.toLowerCase() ; 

    this._tagsHistory = this._tagsHistory.filter( value => value != tag ) ;
    
    if(this._tagsHistory.length >= 10) {

      this._tagsHistory.splice(this._tagsHistory.length-1,1) ;
      
    }

    this._tagsHistory.unshift( tag ) ;
    

  }

}
