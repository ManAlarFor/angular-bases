import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  standalone: false,
  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})

export class HeroComponent {

  public name :string = "iron man" ;
  public age  :number = 45 ;

  get capitalizadName(): string {

    return this.name.toUpperCase() ;

  }

  getHeroDescription(): string {

    return `Soy ${ this.name } y tengo ${ this.age } años` ;

  }

  changeHero():void {

    this.name = "Spider-Man" ;

  }

  changeAge():void {

    this.age = 25 ;

  }
  reset():void {

    this.name = "iron man" ;
    this.age  = 45 ;

  }

}
