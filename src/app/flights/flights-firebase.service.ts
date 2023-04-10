import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Flight } from "./flights-list/flights-list.component";
import { map, tap } from "rxjs";
import { FlightsService } from "./flights.service";

@Injectable({providedIn: "root"})
export class FlightsFirebaseService
{
    constructor(private http: HttpClient,
                private flightsService: FlightsService){}

    storeFlightsFirebase(flights: Flight[])
    {
        this.http
        .put("https://flight-test-2-19949-default-rtdb.firebaseio.com/flights.json", flights)
        .subscribe(response => 
        {
            console.log(response)
        })
    }

    getAllFlightsFirebase()
    {
        return this.http
        .get("https://flight-test-2-19949-default-rtdb.firebaseio.com/flights.json")
        .pipe(map((response: any)=>
        {
            let flights = [];
            for(let key in response)
            {
                flights.push({...response[key], id: key})
            }
            return flights;
        }))
    }
    getFlightsSubscribed()
    {
        return this.http
        .get("https://flight-test-2-19949-default-rtdb.firebaseio.com/flights.json")
        .pipe(map((responseData: any)=>
        {
            let flights = [];
            for(let key in responseData)
            {
                flights.push({...responseData[key], id: +key})
            }
            return flights;
        }), tap(response =>
        {
            this.flightsService.setFlights(response)
        }))  
    }
}