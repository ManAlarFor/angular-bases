import { Component, Input,  } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-gifs-card',
  standalone: false,
  
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent {

  @Input()
  gif! :Gif

}
