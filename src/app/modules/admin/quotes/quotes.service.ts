import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap, of } from 'rxjs';
import { environment } from "environments/environment";

@Injectable({providedIn: 'root'})
export class QuotesService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    newQuote(data: any): Observable<any>
    {
        return this._httpClient.post<any>(`${environment.apiUrl}quotes`, data)
            .pipe(
                switchMap((response: any) => of(response)),
            );
    }

    searchData(data: any): Observable<any>
    {
        return this._httpClient.post<any>(`${environment.apiUrl}quotes/search`, data)
            .pipe(
                switchMap((response: any) => of(response)),
            );
    }

    getQuotes(): Observable<any>
    {
        return this._httpClient.get<any>(`${environment.apiUrl}quotes`);
    }

    getQuote(id: string): Observable<any>
    {
        return this._httpClient.get<any>(`${environment.apiUrl}quotes/${id}`);
    }
}
