/**
 * Card containing logic for rendering / calling leaflet OpenStreetMap
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import * as L from 'leaflet';
import {icon, Marker} from "leaflet";
import {RescueAnimal} from "../../../../shared/models/rescue-animal";
import {NgIf} from "@angular/common";

// Set map assets
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

// Interface for location coords
interface LocationCoordinates {
  [key: string]: { lat: number; lon: number; } | undefined;
}

@Component({
  selector: 'app-animal-in-service-location-info',
  standalone: true,
  imports: [NgIf],
  templateUrl: './animal-in-service-location-info.component.html',
  styleUrl: './animal-in-service-location-info.component.scss'
})
export class AnimalInServiceLocationInfoComponent implements AfterViewInit, OnChanges {

  @Input() animal?: RescueAnimal;
  private map?: L.Map; // Reference leaf map
  private isMapInitialized = false;
  private marker?: L.Marker; // Reference leaf map marker

  // "Fake Locations"
  private locationCoordinates: LocationCoordinates = { // Map "Fake" locations of theoretical company.
    'Grazioso Training Center': { lat: 35.2271, lon: -80.8431 },
    'Grazioso Headquarters': { lat: 35.2271, lon: -80.8431 },
  };

  // Initialize map after view
  ngAfterViewInit(): void {
    if (this.animal && this.animal.inServiceLocation) {
      console.log("NG AFTER VIEW HIT")
      this.initializeMap(this.animal.inServiceLocation);
    }
  }

  // Check for changes and update map
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animal'] && changes['animal'].currentValue && this.isMapInitialized) {
      this.updateMap(this.animal?.inServiceLocation!);
    }
  }

  // Update map
  updateMap(location: string): void {
    const coordinates = this.locationCoordinates[location];
    if (coordinates) {
      this.setMapView(coordinates.lat, coordinates.lon);
    } else {
      this.fetchCoordinates(location)
        .then(coords => {
          if (coords) {
            this.setMapView(coords.lat, coords.lon);
          }
        })
        .catch(error => {
          console.error('Failed to fetch coordinates:', error);
        });
    }
  }

  // Initialize Map
  initializeMap(location: string): void {
    const coordinates = this.locationCoordinates[location];
    if (coordinates) {
      this.map = L.map('map').setView([coordinates.lat, coordinates.lon], 6);
      this.addTileLayer();
      this.marker = L.marker([coordinates.lat, coordinates.lon]).addTo(this.map);
      this.isMapInitialized = true;
    } else {
      this.fetchCoordinates(location)
        .then(coords => {
          if (coords) {
            this.map = L.map('map').setView([coords.lat, coords.lon], 6);
            this.addTileLayer();
            this.marker = L.marker([coords.lat, coords.lon]).addTo(this.map);
            this.isMapInitialized = true;
          }
        })
        .catch(error => {
          console.error('Failed to initialize map:', error);
        });
    }
  }

  // Set map view to specified coordinates
  private setMapView(lat: number, lon: number): void {
    if (this.map && this.marker) {
      this.map.setView([lat, lon], 6);
      this.marker.setLatLng([lat, lon]);
    }
  }

  // Add tile layer to map
  private addTileLayer(): void {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map!);
  }

  // Fetch coordinates location from OpenStreetMap API
  private async fetchCoordinates(location: string): Promise<{ lat: number; lon: number }> {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {lat: data[0].lat, lon: data[0].lon};
    } else {
      throw new Error('Location not found');
    }
  }
}
