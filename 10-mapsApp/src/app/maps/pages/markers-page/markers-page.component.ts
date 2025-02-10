import { Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { LngLat, Map, Marker } from 'maplibre-gl';

interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlainMarker {
  color: string,
  lngLat: number[]
}

@Component({
  standalone: false,
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public markers:MarkerAndColor[] = []

  public map?: Map ;
  public center: LngLat = new LngLat(-1, 40) ;
 
  ngAfterViewInit(): void {
    if (!this.divMap) {
      throw new Error('El elemento HTML no fue encontrado');
    }

    if (typeof document !== 'undefined') {
 
      this.map = new maplibregl.Map({
        container: this.divMap?.nativeElement, // container id
        style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: this.center, // starting position [lng, lat]
      });

      this.readFromLocalStorage() ;

      // const markerHtml = document.createElement('div') ;

      // markerHtml.innerHTML = 'lomo'

      // const marker = new Marker({
      //   // color: 'green'
      //   element: markerHtml
      // })
      //   .setLngLat( this.center )
      //   .addTo( this.map )

    }
  }

  createMarker() {

    if( !!this.map ){

      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const lngLat = this.map.getCenter() ;

      this.addMarker( lngLat, color) ;

    }
  }

  addMarker( LngLat: LngLat, color: string ) {

    if( !!this.map ){

      const marker = new Marker({
        color: color,
        draggable: true
      })
        .setLngLat( LngLat )
        .addTo( this.map )

        this.markers.push({color, marker}) ;
        this.saveToLocalStorage()
     
        marker.on('dragend', () => this.saveToLocalStorage());

    }

  }

  deleteMarker( index: number) {

    this.markers[index].marker.remove() ;
    this.markers.splice(index, 1)
    
    this.saveToLocalStorage()

  }

  flyTo( marker: Marker ){

    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat()
    })

  }

  saveToLocalStorage(){

    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) => {

      return {

        color,
        lngLat: marker.getLngLat().toArray() ,

      }

    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers)) ;

  }

  readFromLocalStorage(){

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]' ;

    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ) ;

    plainMarkers.forEach( ({color, lngLat}) => {

      const [ lng, lat ] = lngLat;

      const coords = new LngLat(  lng, lat)

      this.addMarker( coords, color ) ; 

    })

  }

}
