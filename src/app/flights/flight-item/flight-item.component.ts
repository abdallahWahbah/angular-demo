import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

import { Flight } from '../flights-list/flights-list.component';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.css']
})
export class FlightItemComponent implements OnInit{
  selectedFlight: Flight;

  constructor(private flightService: FlightsService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    // console.log(this.flightService.getFlights())
    
    console.log(this.flightService.getFLight(+this.route.snapshot.params["id"]))
    this.selectedFlight = this.flightService.getFLight(+this.route.snapshot.params["id"])

    this.route.params.subscribe((params: Params) =>
    {
      this.selectedFlight = this.flightService.getFLight(+params["id"])
    })
  }

  handleNavigation(id: number)
  {
    this.router.navigate(['/flights', id, "edit"])
  }
}
