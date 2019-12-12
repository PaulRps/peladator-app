import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authUrl = environment.apiUrl + '/auth';

    constructor(private http: HttpClient) {}

    getToken() {
        // return this.http.post(this.authUrl,
        //     {userName: "", password: ""},
        //     httpOptions)
        //     .pipe(tap((response)=>{
        //         console.log(response)
        //     }),
        //     catchError((a)=>
        //         a
        //     ));
    }
}