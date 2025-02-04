import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  
  templateUrl: './Dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({

    name: ["", [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ["Mario Galaxy 2", Validators.required],
      ["Breath of The Wild", Validators.required],
      ["Persona 3 Reload", Validators.required],
    ]) 

})

public newFavorite: FormControl = new FormControl( "", Validators.required )

  constructor( private fb: FormBuilder ) { }

  get favoriteGames() {

    return this.myForm.get("favoriteGames") as FormArray ;

  }

  isValidFieldInArray( formArray: FormArray, index: number ) {

    return (formArray.controls[index].errors 
         && formArray.controls[index].touched)

  }

  isValidField( field: string ): boolean | null {

    return (this.myForm.controls[ field ].errors 
         && this.myForm.controls[ field ].touched)

  }

  getFieldError( field: string ): string {

    if( this.myForm.controls[field] ){

      const errors = this.myForm.controls[field].errors || {} ;

      for( const key of Object.keys(errors) ) {

          switch( key ) {

            case "required":
              return "Este campo es requerido."

            case "minlength":
              return `Mínimo ${ errors["minlength"].requiredLength } carácteres.` ;

            case "min":
              return `Valor mínimo de ${ errors["min"].min }.` ;

          }

      }

    }

    return "" ;

  }

  onAdd(): void{

      
    if( this.newFavorite.valid ){

      // this.favoriteGames.push( this.newFavorite )
      this.favoriteGames.push( 
        this.fb.control( this.newFavorite.value , Validators.required )
      )

      this.newFavorite.reset() ;
      
    } else {

    }

  }

  onDeleteFavorite( index: number ):void {

    this.favoriteGames.removeAt(index) ;

  }

  onSubmit(): void{

    if( this.myForm.valid ){

      console.log( this.myForm.value ) ;
      (this.myForm.controls["favoriteGames"] as FormArray) = this.fb.array([]) ;
      this.myForm.reset()

    } else {

      this.myForm.markAllAsTouched() ;

    }


  }

 

}
