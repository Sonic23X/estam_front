import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, switchMap, of } from 'rxjs';
import { environment } from "environments/environment";

@Injectable({providedIn: 'root'})
export class SettingsService
{
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    updateAccount(data: any, id: any): Observable<any>
    {
        return this._httpClient.put(`${environment.apiUrl}users/${id}`, data);
    }

    changePassword(data: any, id: any): Observable<any>
    {
        return this._httpClient.post(`${environment.apiUrl}users/${id}/password`, data);
    }

    getTeam(): Observable<any>
    {
        return this._httpClient.get(`${environment.apiUrl}users`);
    }

    newTeamMember(data: any): Observable<any>
    {
        return this._httpClient.post(`${environment.apiUrl}users`, data);
    }

}
