import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllPlayers } from '../../../domain/usecases/get-all-players';
import { Player } from '../../../domain/models/player';

@Component({
  selector: 'app-list-players',
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.scss',
})
export class ListPlayersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  data: MatTableDataSource<Player> = new MatTableDataSource();
  displayedColumns: string[] = [/* 'id', */ 'name', 'position', 'level'];
  pageSize = 5;

  constructor(private readonly getAllPlayers: GetAllPlayers) {}

  ngOnInit(): void {
    this.getAllPlayers.execute().subscribe((players) => {
      this.data = new MatTableDataSource(players);
      console.log(players);
    });
  }

  ngAfterViewInit() {
    this.data.paginator = <any>this.paginator;
    this.data.sort = <any>this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }
}

