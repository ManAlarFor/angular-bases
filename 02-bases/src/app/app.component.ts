import { Component } from '@angular/core';
import { CounterComponent } from './counter/component/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {

  public title:string = 'Mi Primera App de Angular';

}
