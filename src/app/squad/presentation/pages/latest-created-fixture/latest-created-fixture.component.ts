import { Component, OnInit } from '@angular/core';
import { GetLatestFixture } from '../../../domain/usecases/get-latest-fixture';
import { Fixture } from '../../../domain/models/fixture';

@Component({
  selector: 'app-latest-created-fixture',
  templateUrl: './latest-created-fixture.component.html',
  styleUrl: './latest-created-fixture.component.scss',
})
export class LatestCreatedFixtureComponent implements OnInit {
  constructor(private readonly getLatestFixture: GetLatestFixture) {}
  fixture?: Fixture;

  ngOnInit(): void {
    this.getLatestFixture.execute().subscribe((fixture) => {
      this.fixture = fixture;
    });
  }
}

