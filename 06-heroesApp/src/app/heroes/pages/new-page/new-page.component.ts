import { Component } from '@angular/core';
import { Publisher } from '../../interfaces/hero.interface';
import { identity } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  standalone: false,
  styles: [
  ]
})
export class NewPageComponent {

  public publishers = [

    { id:"DC Comics", desc: "DC - Comics" },
    { id:"Marvel Comics", desc: "Marvel - Comics" },
    { id:"Otras Empresas", desc: "Otras Empresas" },

  ]

}
