import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import { FlightsService } from '../flights.service';
import { FlightsFirebaseService } from '../flights-firebase.service';

export interface Flight{
  id: number;
  to: string;
  from: string;
  date: Date;
  destinationImage: string
}

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit{
  flights: Flight[];

  constructor(private flightService: FlightsService,
              private router: Router,
              private flightsFirebase: FlightsFirebaseService){}

  ngOnInit(): void {

    this.flightsFirebase.getAllFlightsFirebase().subscribe(response => this.flightService.setFlights(response))
    // this.flights = this.flightService.getFlights()

    this.flightService.flightsChanged.subscribe(flights => 
    {
      this.flights = flights
    })
  }

  handleChoose(comingFlight: Flight)
  {
    this.flightService.selectedFlight.emit(comingFlight);
    this.router.navigate(['/flights', comingFlight.id])
  }

  storeFlights()
  {
    this.flightsFirebase.storeFlightsFirebase(this.flights);
  }
}
