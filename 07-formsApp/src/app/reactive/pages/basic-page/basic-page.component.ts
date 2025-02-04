import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validator, Validators } from '@angular/forms';

const filete = {

  name: "Filete",
  price: 13,
  inStorage: 14

}

@Component({
  standalone: false,
  
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  constructor( private fb: FormBuilder) { }

  public myForm: FormGroup = this.fb.group({

    name:      ['', [ Validators.required, Validators.minLength(3) ]],
    price:     [0,  [ Validators.required, Validators.min(1)       ]],
    inStorage: [0,  [Validators.required,  Validators.min(0)       ]],

  })

  ngOnInit() {
    
    // this.myForm.reset( filete )

  }

  onSave(): void{

    if( this.myForm.valid){

      console.log( this.myForm.value )

      this.myForm.reset({ price: 0, inStorage: 0 }) ;

    } else {

      this.myForm.markAllAsTouched() ;

    }

  }

  isValidField( field: string ): boolean | null {

    return (this.myForm.controls[ field ].errors && this.myForm.controls[ field ].touched)

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

}
