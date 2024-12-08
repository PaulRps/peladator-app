import { Injectable } from '@angular/core';
import { GetPlayersWithFixtureHistory } from './get-players-with-fixture-history';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { map, Observable, switchMap } from 'rxjs';
import { PlayerWithFixtureAndPaymentHistory } from '../models/player-with-fixture-history';
import { GetCurrentPayment } from '../../../payment/domain/usecases/get-current-payment';

@Injectable({
  providedIn: 'root',
})
export class GetPlayersWithFixtureAndPaymentHistory
  implements Usecase<void, Observable<PlayerWithFixtureAndPaymentHistory[]>>
{
  constructor(
    private readonly getPlayersWithFixtureHistory: GetPlayersWithFixtureHistory,
    private readonly getCurrentPayment: GetCurrentPayment
  ) {}

  execute(_: void): Observable<PlayerWithFixtureAndPaymentHistory[]> {
    return this.getPlayersWithFixtureHistory.execute().pipe(
      switchMap((players) => {
        return this.getCurrentPayment.execute().pipe(
          map((payment) => {
            const today = new Date().toISOString().split('T')[0].split('-')[2];

            players.forEach((player) => {
              player.hasPaid =
                payment?.customersMonthlyPaid?.includes(player.id) ||
                payment?.customersDailyPaid?.[today]?.includes(player.id);
            });

            return players;
          })
        );
      })
    );
  }
}

