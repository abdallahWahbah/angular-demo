import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FlightEditComponent } from "./flights/flight-edit/flight-edit.component";
import { FlightItemComponent } from "./flights/flight-item/flight-item.component";
import { FlightsComponent } from "./flights/flights.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FlightsResolverService } from "./flights/flights.resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "flights", 
        component: FlightsComponent, 
        canActivate: [AuthGuard],
        children:[
            {path: "new", component: FlightEditComponent},
            {path: ":id", component: FlightItemComponent, resolve: [FlightsResolverService]},
            {path: ":id/edit", component: FlightEditComponent, resolve: [FlightsResolverService]}
    ]},
    {path: "auth", component: AuthComponent},
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