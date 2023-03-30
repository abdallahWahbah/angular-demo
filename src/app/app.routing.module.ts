import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlightEditComponent } from "./flights/flight-edit/flight-edit.component";
import { FlightItemComponent } from "./flights/flight-item/flight-item.component";
import { FlightsComponent } from "./flights/flights.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "flights", component: FlightsComponent, children:[
        {path: "new", component: FlightEditComponent},
        {path: ":id", component: FlightItemComponent},
        {path: ":id/edit", component: FlightEditComponent}
    ]},
    {path: "not-found", component: NotFoundComponent},
    {path: "**", redirectTo: "not-found"}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule
{

}