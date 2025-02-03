import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { filter, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  standalone: false,
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor( 
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){ }


  ngOnInit(): void {

    if( this.router.url.includes('edit') ) {

      this.activatedRoute.params
        .pipe(

          switchMap( ({ id }) => this.heroesService.getHeroById(id)),

        ).subscribe( hero => {

          if( !hero ) return this.router.navigateByUrl("/") ;

          this.heroForm.reset( hero )

          return;

        })

    }

  }

  get currentHero(): Hero {

    const hero = this.heroForm.value as Hero ;

    return hero ;

  }

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    alter_ego: new FormControl(''),
    publisher: new FormControl<Publisher>( Publisher.Otras ),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),

  })

  public publishers = [

    { id:"DC Comics", desc: "DC - Comics" },
    { id:"Marvel Comics", desc: "Marvel - Comics" },
    { id:"Otras Empresas", desc: "Otras Empresas" },

  ]

  onSubmit():void {

    if( this.heroForm.valid ) {

      if( this.currentHero.id ){

        this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackbar(`${ hero.superhero } updated!`)
          this.goBack() ;
        } )
        
        return ;
        
      } else if ( !this.currentHero.id ) {

        this.heroesService.addHero( this.currentHero )
          .subscribe( hero => {

            this.showSnackbar(`${ hero.superhero } created!`)

            this.goBack() ;

          })

      }

    }

  }

  onDeleteHero() {

    if ( !this.currentHero.id ) throw Error("Hero id is required");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {

      data: this.heroForm.value 

    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result:boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id ) ),
        filter( (deleted:boolean) => deleted )
      )
      .subscribe(() => {
        this.router.navigateByUrl("/heroes")
      }
        
    )

  }
  
  goBack():void{

    this.router.navigateByUrl("/heroes")

  }

  showSnackbar( message:string ): void {

    this.snackbar.open( message, "Done", {
      duration: 2500
    })

  }

}