import { Component, EventEmitter, Output } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output()
  public reVisiting: EventEmitter<string> = new EventEmitter() ;

  constructor( private service:GifsService ) {}

  get tags() {

    return this.service.tagsHistory ;

  }

  reVisit(search:string){

    this.service.searchTag(search)

  }
  
}
