import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private _tagsHistory: string[] = [] ;
  private apiKey:string = "B7v2lz1V7w7fIebOMhw76SjjtuNmTq7b";

  public gifList: Gif[] = []

  constructor(private http: HttpClient) {

    this.loadLocalStorage()

    if( this._tagsHistory.length > 0 ){

      this.searchTag( this._tagsHistory[0] )

    }

   };

  get tagsHistory() {

    return [...this._tagsHistory] ;

  }

  historyOrder( tag :string ) {

    
    this._tagsHistory = this._tagsHistory.filter( value => value != tag ) ;
    
    if(this._tagsHistory.length >= 10) {

      this._tagsHistory.splice(this._tagsHistory.length-1,1) ;
      
    }

    this._tagsHistory.unshift( tag ) ;

    this.saveLocalStorage() ;

  }

  private saveLocalStorage(){

    localStorage.setItem("history", JSON.stringify( this._tagsHistory ))

  }
  private loadLocalStorage(){

    if( localStorage.getItem("history") ){

      this._tagsHistory = JSON.parse( localStorage.getItem("history")! )

    }


  }

  searchTag(tag:string):void {

    tag = tag.toLowerCase() ; 

    this.historyOrder( tag )

    let params = new HttpParams()
    .set("apiKey", this.apiKey)
    .set("limit", 10)
    .set("q",tag)


    this.http.get<SearchResponse>(`https://api.giphy.com/v1/gifs/search/`,{ params })
    .subscribe( resp => {
      this.gifList = resp.data ;
    })

  }

}
