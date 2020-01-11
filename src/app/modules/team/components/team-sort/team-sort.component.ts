import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team-sort',
  templateUrl: './team-sort.component.html',
  styleUrls: ['./team-sort.component.scss']
})
export class TeamSortComponent implements OnInit {
  teams: any;
  constructor(private router: Router,
              private location: Location) {
    this.teams = this.router.getCurrentNavigation().extras.state;
    if (!this.teams) {
      this.location.back();
    }
  }

  ngOnInit() {
  }

  mock = () => {
    this.teams =
      [
        {
          name: 'Verde',
          players: [
            {
              id: 11,
              name: 'Dida',
              age: 41,
              shirtNumber: 12,
              skillLevel: {id: 4, name: 'Boleiro'},
              position: {id: 1, name: 'Goleiro', shortName: 'GL'}
            },
            {
              id: 1,
              name: 'Messi',
              age: 34,
              shirtNumber: 10,
              skillLevel: {id: 5, name: 'Joga Muito'},
              position: {id: 7, name: 'Atacante', shortName: 'ATA'}
            }
          ]
        },
        {
          name: 'Vermelho',
          players: [
            {
              id: 11,
              name: 'Dida',
              age: 41,
              shirtNumber: 12,
              skillLevel: {id: 4, name: 'Boleiro'},
              position: {id: 1, name: 'Goleiro', shortName: 'GL'}
            },
            {
              id: 1,
              name: 'Messi',
              age: 34,
              shirtNumber: 10,
              skillLevel: {id: 5, name: 'Joga Muito'},
              position: {id: 7, name: 'Atacante', shortName: 'ATA'}
            }
          ]
        }
      ];
  }
}
