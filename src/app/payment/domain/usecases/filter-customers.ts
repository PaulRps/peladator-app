import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Customer } from '../models/customer';
import { FilterPlayers } from '../../../squad/domain/usecases/filter-players';

@Injectable({
  providedIn: 'root',
})
export class FilterCustomers implements Usecase<string[], Observable<Customer[]>> {
  constructor(private readonly filterPlayers: FilterPlayers) {}

  execute(customerIds: string[]): Observable<Customer[]> {
    return this.filterPlayers.execute(customerIds);
  }
}
