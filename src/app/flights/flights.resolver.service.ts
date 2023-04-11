import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Flight } from "./flights-list/flights-list.component";
import { Observable } from "rxjs";
import { FlightsService } from "./flights.service";
import { FlightsFirebaseService } from "./flights-firebase.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class FlightsResolverService implements Resolve<Flight[]>
{
    constructor(private flightsService: FlightsService,
                private flightsFirebase: FlightsFirebaseService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let flights = this.flightsService.getFlights();
        
        if(flights.length === 0)
        {
            return this.flightsFirebase.getFlightsSubscribed()
        }
        else 
        {
            return flights
        }
    }
}