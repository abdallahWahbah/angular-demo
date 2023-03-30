import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { Flight } from '../flights-list/flights-list.component';

import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit{

  @ViewChild("form") formData: NgForm;

  editableFlight: Flight = {id: Infinity, to: "", from: "", date: new Date(), destinationImage: ""}

  constructor(private flightService: FlightsService,
              private router: Router,
              private route: ActivatedRoute){}


  ngOnInit(): void {
    
    this.editableFlight = JSON.parse(JSON.stringify(this.flightService.getFLight(+this.route.snapshot.params["id"] - 1)))
  
    this.route.params.subscribe((params: Params) =>
    {
      // this.editableFlight = this.flightService.getFLight(+this.route.snapshot.params["id"] - 1) // i made the following 2 lines of code vause the date initial value doesn't work properly
      let flight = this.flightService.getFLight(+this.route.snapshot.params["id"] - 1);
      this.editableFlight = JSON.parse(JSON.stringify({
                              id: flight.id,
                              to: flight.to,
                              from: flight.from,
                              date: new Date(flight.date).toISOString().slice(0, 10),
                              destinationImage: flight.destinationImage,
                            }))
    })
    // console.log(this.editableFlight)
  }
  onSubmit()
  {
    if(this.editableFlight.id === Infinity)
    {
      this.flightService.addFlight({
        id: this.flightService.getFlights().length + 1,
        to: this.formData.value.destination,
        from: this.formData.value.departure,
        date: this.formData.value.date,
        destinationImage: this.formData.value.image,
      })
    }
    else
    {
      this.flightService.updateFlight(this.editableFlight.id - 1, {
        id: this.editableFlight.id,
        to: this.formData.value.destination,
        from: this.formData.value.departure,
        date: this.formData.value.date,
        destinationImage: this.formData.value.image,
      })
    }

  }

  
}
