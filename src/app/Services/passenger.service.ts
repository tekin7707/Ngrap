import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passenger } from '../models/passenger';
import { Observable } from 'rxjs';

const url = "https://api.instantwebtools.net/v1/airlines";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private _httpClient: HttpClient) {}

  GetPassengers(): Observable<Passenger> {
    let list =  this._httpClient.get<Passenger>(url);
    return list;
  }
}
