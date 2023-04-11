import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        // const modifiedRequest = req.clone({
        //     params: new HttpParams().set("auth", "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YzFlN2Y4MDAzNGJiYzgxYjhmMmRiODM3OTIxZjRiZDI4N2YxZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmxpZ2h0cy10ZXN0LWExNDA2IiwiYXVkIjoiZmxpZ2h0cy10ZXN0LWExNDA2IiwiYXV0aF90aW1lIjoxNjgwNjk0MDIyLCJ1c2VyX2lkIjoiVjg5RUk4dEZvYll1WjFlWllaZEc0cjAzamNEMyIsInN1YiI6IlY4OUVJOHRGb2JZdVoxZVpZWmRHNHIwM2pjRDMiLCJpYXQiOjE2ODA2OTQwMjIsImV4cCI6MTY4MDY5NzYyMiwiZW1haWwiOiJhYmRvQHJlYWN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhYmRvQHJlYWN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.RqbdFsePuQfgyoTuyDEJTH8rUQ2S-7fh_W8RDDHZ8CNDXG0WTKpikfkV2W5xI9qX2I5u2jlcelQplG3NN1b9e8F7FwPIaL311NcIENe9qzMcIUdEqzDpWN9lnMzQjJ-1wcZvgGi0Z3aF19lbWWtcgKu_RW8Gt5ychIup6iOWB-SdGpQlqN5QUtzpARrS_RZTu-fLJAdsVzgbJocSFrJT18MqCPTC8ABnk8XJY6XLM7MgSVPR2oA2JUizxsVhQvc0VYLGOWezeWZjjOClzft0voHwiBozzGZ7LULePzXUtYtMgGButKjRSuXWXuYTe5LXD6XekGvjyDcdJP9Zmc505A")
        // })
        // return next.handle(modifiedRequest);

        

        // return this.authService.user.pipe(take(1), exhaustMap(user =>
        // {
        //     // if(!user) 
        //     // {
        //     //     return next.handle(req);
        //     // }
        //     const modifiedRequest = req.clone({
        //         params: new HttpParams().set("auth", user.token || "")
        //     })
        //     return next.handle(modifiedRequest);    
        // }))

        

        const user = this.authService.user;
        if(!user){return next.handle(req)}
        
        const modifiedRequest = req.clone({
            params: new HttpParams().set("auth", user.token || "")
        })
        return next.handle(modifiedRequest); 
    }
}