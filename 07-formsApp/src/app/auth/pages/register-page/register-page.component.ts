import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  standalone: false,
  
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ["", [ Validators.required, Validators.pattern( this.validatorService.firstNameAndLastnamePattern ) ]],
    email: ["", [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidator ]],
    username: ["", [ Validators.required, this.validatorService.cantBeStrider]],
    password: ["", [ Validators.required, Validators.minLength(6) ]],
    password2: ["", [ Validators.required ]],
  },{
    
    validators: [

      this.validatorService.equalFields( "password", "password2" )

    ]

  })

  
  constructor( 
    private fb: FormBuilder ,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidator
  ){}

  isValidField( field: string ) {

    return this.validatorService.isValidField( this.myForm, field )

  }

  onSubmit() {

    this.myForm.markAllAsTouched() ;

  }

}
