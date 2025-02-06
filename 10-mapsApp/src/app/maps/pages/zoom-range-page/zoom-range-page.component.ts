import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import maplibregl, { LngLat, Map } from 'maplibre-gl';

@Component({
  standalone: false,
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
 
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map ;

  public zoom: number = 5 ;
  public center: LngLat = new LngLat(-1, 40) ;
 
  ngAfterViewInit(): void {
    if (!this.divMap) {
      throw new Error('El elemento HTML no fue encontrado');
    }

    if (typeof document !== 'undefined') {
 
      this.map = new maplibregl.Map({
        container: this.divMap?.nativeElement, // container id
        style:
        'https://api.maptiler.com/maps/hybrid/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: this.center, // starting position [lng, lat]
        zoom: this.zoom // starting zoom
      });

      this.mapListeners() ;

    }
  }

  mapListeners() {

    if( !this.map ) throw "Mapa no inicializado" ;

    this.map.on('zoom', () => {

      this.zoom = this.map!.getZoom() ;

    }) ;

    this.map.on('zoomend', () => {

      if( this.map!.getZoom() < 18 ) return;

      this.map!.zoomTo(18) ;

    }) ;

    this.map.on('move', () => {

      this.center = this.map!.getCenter() ;

    })


  }

  zoomIn() {

    this.map?.zoomIn() ;

  }

  zoomOut() {

    this.map?.zoomOut() ;

  }

  zoomChanged( value: string ) {

    this.zoom = Number(value) ;

    this.map?.zoomTo( this.zoom ) ;

  }

  ngOnDestroy(): void {

    this.map?.remove() ;

  }

}
