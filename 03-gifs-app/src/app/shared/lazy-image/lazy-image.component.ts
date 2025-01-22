import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,
  
  templateUrl: './lazy-image.component.html',
})

export class LazyImageComponent {

  @Input()
  public url! :string ;
  @Input()
  public alt :string = "No description" ;

  public hasLoaded: boolean = false;

  public onLoad() {
    this.hasLoaded = true ;
  }

  ngOnInit():void{
    if( !this.url) throw new Error("Url Property is required") ;
  }

}
