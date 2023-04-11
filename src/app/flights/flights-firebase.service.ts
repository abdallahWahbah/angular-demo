import { Injectable } from "@angular/core";
import { FlightsService } from "./flights.service";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class FlightsFirebaseService
{
    constructor(private flightService: FlightsService,
                private http: HttpClient){}

    postFlightFirebase(formData: any)
    {
        this.http
        .post("https://flights-test-a1406-default-rtdb.firebaseio.com/flights.json",{
            flightId: Math.random().toString(),
            to: formData.value.destination,
            from: formData.value.departure,
            date: formData.value.date,
            destinationImage: formData.value.image,
        })
        .subscribe(response =>
        {
            console.log(response)
        })
    }

    storeAllFlights(flights: any)
    {
        this.http
        .put("https://flights-test-a1406-default-rtdb.firebaseio.com/flights.json", flights)
        .subscribe(response => console.log(response))
    }

    getFlightsFirebase()
    {
        return this.http
        .get("https://flights-test-a1406-default-rtdb.firebaseio.com/flights.json")
        .pipe(map((responseData: any)=>
        {
            let flights = [];
            for(let key in responseData)
            {
                flights.push({...responseData[key], id: +key})
            }
            return flights;
        }))
    }
    getFlightsSubscribed()
    {
        return this.http
        .get("https://flights-test-a1406-default-rtdb.firebaseio.com/flights.json")
        .pipe(map((responseData: any)=>
        {
            let flights = [];
            for(let key in responseData)
            {
                flights.push({...responseData[key], id: +key})
            }
            return flights;
        }),tap(response =>
        {
            this.flightService.setFlights(response);
        }))
        
        
    }
}