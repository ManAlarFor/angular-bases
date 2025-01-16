import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  standalone: false,
  
  templateUrl: './list.component.html',
})

export class ListComponent {

  public heroNames:string[] = ["Spiderman", "Ironman", "Hulk", "Magik", "Moon Knight", "Invencible", "Omniman"] ;
  public borrado: string | undefined ;

  borrar() {

    this.borrado = this.heroNames.pop() ;

  }

}
