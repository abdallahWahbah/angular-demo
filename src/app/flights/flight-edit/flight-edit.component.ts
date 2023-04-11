// import { Component, OnInit, ViewChild } from '@angular/core';
// import {NgForm} from "@angular/forms";
// import {Router, ActivatedRoute, Params} from "@angular/router";
// import { Flight } from '../flights-list/flights-list.component';

// import { FlightsService } from '../flights.service';

// @Component({
//   selector: 'app-flight-edit',
//   templateUrl: './flight-edit.component.html',
//   styleUrls: ['./flight-edit.component.css']
// })
// export class FlightEditComponent implements OnInit{

//   @ViewChild("form") formData: NgForm;

//   editableFlight: Flight = {id: Infinity, to: "", from: "", date: new Date(), destinationImage: ""}

//   constructor(private flightService: FlightsService,
//               private router: Router,
//               private route: ActivatedRoute){}


//   ngOnInit(): void {
    
//     this.editableFlight = JSON.parse(JSON.stringify(this.flightService.getFLight(+this.route.snapshot.params["id"] - 1)))
  
//     this.route.params.subscribe((params: Params) =>
//     {
//       // this.editableFlight = this.flightService.getFLight(+this.route.snapshot.params["id"] - 1) // i made the following 2 lines of code vause the date initial value doesn't work properly
//       let flight = this.flightService.getFLight(+this.route.snapshot.params["id"] - 1);
//       this.editableFlight = JSON.parse(JSON.stringify({
//                               id: flight.id,
//                               to: flight.to,
//                               from: flight.from,
//                               date: new Date(flight.date).toISOString().slice(0, 10),
//                               destinationImage: flight.destinationImage,
//                             }))
//     })
//     // console.log(this.editableFlight)
//   }
//   onSubmit()
//   {
//     if(this.editableFlight.id === Infinity)
//     {
//       this.flightService.addFlight({
//         id: this.flightService.getFlights().length + 1,
//         to: this.formData.value.destination,
//         from: this.formData.value.departure,
//         date: this.formData.value.date,
//         destinationImage: this.formData.value.image,
//       })
//     }
//     else
//     {
//       this.flightService.updateFlight(this.editableFlight.id - 1, {
//         id: this.editableFlight.id,
//         to: this.formData.value.destination,
//         from: this.formData.value.departure,
//         date: this.formData.value.date,
//         destinationImage: this.formData.value.image,
//       })
//     }

//   }

  
// }


import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { Flight } from '../flights-list/flights-list.component';
import { FlightsService } from '../flights.service';
import { FlightsFirebaseService } from '../flights-firebase.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit{

  formData: FormGroup;

  editableFlight: Flight = {id: Infinity, to: "", from: "", date: new Date(), destinationImage: ""}

  constructor(private flightService: FlightsService,
              private router: Router,
              private route: ActivatedRoute,
              private flightsFirebase: FlightsFirebaseService){}


  ngOnInit(): void {

    if(!+this.route.snapshot.params["id"] && (+this.route.snapshot.params["id"] !== 0))
    {
      this.formInitilization("", "", "", "");
      return;
    }

    this.editableFlight = JSON.parse(JSON.stringify(this.flightService.getFLight(+this.route.snapshot.params["id"])))
  console.log(this.editableFlight)
    this.route.params.subscribe((params: Params) =>
    {
      let flight = this.flightService.getFLight(+this.route.snapshot.params["id"]);
      this.editableFlight = JSON.parse(JSON.stringify({
                            ...flight,
                              date: new Date(flight.date).toISOString().slice(0, 10),
                            }))
      this.formInitilization(flight.to, flight.from, new Date(flight.date).toISOString().slice(0, 10), flight.destinationImage)
    })
  }

  formInitilization(destination: string, departure: string, date: string, image: string)
  {
    this.formData = new FormGroup({
      destination: new FormControl(destination, [Validators.required, this.allowedCountries]),
      departure: new FormControl(departure, [Validators.required]),
      date: new FormControl(date),
      image: new FormControl(image)
    })
  }

  allowedCountries(control: FormControl)
  {
    const countries = ["Egypt", "Saudi Arabia", "Jordan", "Lebanon", "United Arab Emirates"];
    if(countries.indexOf(control.value) === -1 && control.value.split("").length !== 0)
    {
      return {"County is not allowed": true}
    }
    return null
  }

  onSubmit()
  {
    // this.flightsFirebase.postFlightFirebase(this.formData)
    if(this.editableFlight.id === Infinity)
    {
      console.log("new")
      this.flightService.addFlight({
        id: this.flightService.getFlights().length,
        to: this.formData.value.destination,
        from: this.formData.value.departure,
        date: this.formData.value.date,
        destinationImage: this.formData.value.image,
      })
    }
    else
    {
      this.flightService.updateFlight(this.editableFlight.id, {
        id: this.editableFlight.id,
        to: this.formData.value.destination,
        from: this.formData.value.departure,
        date: this.formData.value.date,
        destinationImage: this.formData.value.image,
      })
    }
  }
}
