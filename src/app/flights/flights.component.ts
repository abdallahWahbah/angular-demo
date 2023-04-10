import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { Flight } from './flights-list/flights-list.component';
import { FlightsService } from './flights.service';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent{
  selectedFlight: Flight;

  constructor(private router: Router,
              private flightService: FlightsService){}

  handleNavigation()
  {
    this.router.navigate(['/flights', 'new'])
  }
}
