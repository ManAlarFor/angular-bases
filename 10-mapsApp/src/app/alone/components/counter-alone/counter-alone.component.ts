import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  // imports: [],
  templateUrl: './counter-alone.component.html',
})
export class CounterAloneComponent {

  @Input()
  public counter = 10;

}
