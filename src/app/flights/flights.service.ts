import { EventEmitter } from "@angular/core"
import { Flight } from "./flights-list/flights-list.component"

export class FlightsService
{
    selectedFlight = new EventEmitter<Flight>()
    flightsChanged = new EventEmitter<Flight []>()

    private flights = [
        {
          id: 0,
          from: "Egypt",
          to: "Jordan",
          date: new Date("2023-4-21"),
          destinationImage: "https://jordantraveler.com/wp-content/uploads/2022/05/Amman-Itinerary-Hero.png"
        },
        {
          id: 1,
          from: "Lebanon",
          to: "Saudi Arabia",
          date: new Date("2023-5-16"),
          destinationImage: "https://www.worldbank.org/content/dam/photos/780x439/2022/feb-3/Saudi-Arabia-Riyadh.jpg"
        },
        {
          id: 2,
          from: "Quatar",
          to: "United Arab Emirates",
          date: new Date("2023-4-1"),
          destinationImage: "https://s30876.pcdn.co/wp-content/uploads/United-Arab-Emirates.jpg.optimal.jpg"
        },
        {
          id: 3,
          from: "Jordan",
          to: "Egypt",
          date: new Date("2023-3-29"),
          destinationImage: "https://cdn.mos.cms.futurecdn.net/YMa7Wx2FyjQFUjEeqa72Rm-1200-80.jpg"
        },
    ]

    getFlights()
    {
        return this.flights.slice()
    }

    getFLight(index: number)
    {
        return this.flights[index]
    }

    addFlight(flight: Flight)
    {
      this.flights.push(flight);
      this.flightsChanged.emit(this.flights.slice());
    }

    updateFlight(index: number, updatedFlight: Flight)
    {
      this.flights[index] = updatedFlight;
      this.flightsChanged.emit(this.flights.slice());
    }
}