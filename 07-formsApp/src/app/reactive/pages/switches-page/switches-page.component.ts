import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({

    gender: [ "M", Validators.required ],
    wantNotification: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]

  }) ;

  constructor( private fb: FormBuilder ){ }


  onSave() {

    if(this.myForm.invalid) {
      
      this.myForm.markAllAsTouched()
      
    } else {
      
      console.log(this.myForm.value) ;

      this.myForm.reset( {
        gender: "M",
        wantNotification: true
      } ) ;

    }

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

}
