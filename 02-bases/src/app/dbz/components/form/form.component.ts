import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-form',
  standalone: false,
  
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter() ;

  public character: Character = {
    id: "" ,
    name: '' ,
    power: 0
  }

  emitCharacter():void {

    if( this.character.name.length === 0 ) return ;

    this.onNewCharacter.emit(this.character) ;

    this.character.name = "" ;
    this.character.power = 0 ;

  }

}
