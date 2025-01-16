import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  standalone: false,
  
  templateUrl: './list.component.html',
})


export class ListComponent {

  
    @Input() public characters:Character[] = []

    @Output()
    public onDelete: EventEmitter<string> = new EventEmitter() ;

    onDeleteCharacter(id:string | undefined):void {

      this.onDelete.emit(id) ;

    }
  

}
