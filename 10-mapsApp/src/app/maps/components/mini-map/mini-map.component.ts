import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import maplibregl, { Map, Marker } from 'maplibre-gl';

@Component({
  selector: 'map-mini-map',
  standalone: false,
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  
  @Input() lngLat?: [number, number] ;

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map ;

  ngAfterViewInit() {

    if( !this.divMap?.nativeElement ) throw "LngLat can't be null" ;
    if( !this.lngLat ) throw "LngLat can't be null" ;
   
    if (typeof document !== 'undefined') {


      const map = new maplibregl.Map({
        container: this.divMap?.nativeElement, // container id
        style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: this.lngLat, // starting position [lng, lat]
        zoom: 16,
        interactive: false,
      });
    }

  }

}
