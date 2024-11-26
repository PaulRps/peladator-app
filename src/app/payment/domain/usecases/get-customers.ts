import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { GetAllPlayers } from '../../../squad/domain/usecases/get-all-players';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class GetCustomers implements Usecase<void, Observable<Customer[]>> {
  constructor(private readonly getPlayers: GetAllPlayers) {}

  execute(_: void): Observable<Customer[]> {
    return this.getPlayers.execute();
  }
}

