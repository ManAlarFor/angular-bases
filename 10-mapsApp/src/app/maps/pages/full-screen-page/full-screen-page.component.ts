import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { LngLat, Map } from 'maplibre-gl';
  
@Component({
  standalone: false,
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'], // Corregido `styleUrl` a `styleUrls`
})
export class FullScreenPageComponent implements AfterViewInit {
 
  @ViewChild('map') divMap?: ElementRef;
 
  ngAfterViewInit(): void {
    if (!this.divMap) {
      throw new Error('El elemento HTML no fue encontrado');
    }
 
    if (typeof document !== 'undefined') {
      
      const map = new maplibregl.Map({
        container: this.divMap?.nativeElement, // container id
        style:
        'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: [0, 1], // starting position [lng, lat]
        zoom: 0, // starting zoom
        dragRotate: false
      });

      
      map.on('style.load', () => {
        map!.setProjection({
          type: 'globe', // Set projection to globe
        });
      });
    }

  }

}