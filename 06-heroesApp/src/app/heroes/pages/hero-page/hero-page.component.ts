import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  standalone: false,
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  constructor( 
      private heroService: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {}

  public id: string = "" ;
  public hero?: Hero ;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
          delay(900),
          switchMap( ({id}) => this.heroService.getHeroById(id) )
      ).subscribe( hero => {
          if( !hero ) return this.router.navigate([ "/heroes/list"]) ;

          this.hero = hero ;
          
          console.log(this.hero)
          return ;
          
        }
      )

  }

  goBack():void{

    this.router.navigateByUrl("/heroes")

  }



}
