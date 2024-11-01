import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../../domain/models/player';
import { GetAllPlayers } from '../../../domain/usecases/get-all-players';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FixtureCriteria } from '../../../domain/models/fixture-criteria';
import { CreateFixture } from '../../../domain/usecases/create-fixture';
import { Fixture } from '../../../domain/models/fixture';

@Component({
  selector: 'app-create-fixture',
  templateUrl: './create-fixture.component.html',
  styleUrl: './create-fixture.component.scss',
})
export class CreateFixtureComponent {
  data: MatTableDataSource<Player> = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'name', 'position', 'level'];
  pageSize = 5;
  fixtureFormGroup: FormGroup;
  selection = new SelectionModel<Player>(true, []);
  fixture?: Fixture;

  constructor(private readonly getAllPlayers: GetAllPlayers, private readonly createFixtur: CreateFixture) {
    this.fixtureFormGroup = new FormGroup({
      amountPlayersInLineUp: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllPlayers.execute().subscribe((players) => {
      this.data = new MatTableDataSource(players);
      console.log(players);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.data.data);
  }

  createFixture(stepper: any) {
    if (this.fixtureFormGroup.invalid) {
      this.fixtureFormGroup.markAllAsTouched();
      return;
    }
    if (this.selection.selected.length == 0) return;

    this.createFixtur
      .execute(
        new FixtureCriteria({
          players: this.selection.selected,
          amountPlayersInLineUp: Number(this.fixtureFormGroup.get('amountPlayersInLineUp')?.value),
        })
      )
      .subscribe((fixture) => {
        // this.selection.clear();
        this.fixture = fixture;
        stepper.next();
      });
  }
}


