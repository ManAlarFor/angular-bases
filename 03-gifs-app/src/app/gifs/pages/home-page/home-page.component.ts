import { Component, Input } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  @Input()
  reVisit(search:string) {

    this.gifService.searchTag(search) ;

  }

  constructor( private gifService: GifsService ) { }

  get gifs(): Gif[] {
 
    return this.gifService.gifList

  }

}
