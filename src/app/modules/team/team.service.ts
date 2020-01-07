import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Player } from '../../shared/models/player.model';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamUrl = environment.apiUrl + '/team';

  constructor(private http: HttpClient,
              private dialogService: DialogService) { }

  sortTeams(selectedPlayers: Player[]) {
    return this.http.post(this.teamUrl + '/sort-teams', selectedPlayers, httpOptions).pipe(
      tap((players: Player[]) => LoggerService.log(`sort teams w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('sortTeams'))
    );
  }
}
