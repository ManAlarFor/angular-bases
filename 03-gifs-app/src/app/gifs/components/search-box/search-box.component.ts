import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: false,
  
  template: `
      <h5>Buscar:</h5>
      <input type="text" 
             class="form-control" 
             placeholder="Buscar gifs..."
             (keyup.enter)="searchTag()"
             #txtTagInput
             >    
  `,
})
export class SearchBoxComponent {

  @ViewChild("txtTagInput")
  public tagInput!: ElementRef<HTMLInputElement> ;

  constructor( public service : GifsService) {}

  searchTag() {

    const newTag = this.tagInput.nativeElement.value ;

    if(newTag.length == 0) return ;

    this.service.searchTag(newTag) ;

    this.tagInput.nativeElement.value = "" ;

  }

}
