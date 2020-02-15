import { UserFormComponent } from './../user-form/user-form.component';
import { User } from './../../../../shared/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tableColumns: string[] = ['id', 'name', 'role'];
  users: MatTableDataSource<User> = new MatTableDataSource<User>();

  constructor(private userService: UserService, private modalService: MatDialog) {}

  ngOnInit() {
    this.paginator.hidePageSize = true;
    this.userService.getAll().subscribe(users => {
      this.users.data = users;
      this.users.paginator = this.paginator;
    });
    this.userService.getEvent().subscribe(users => (this.users.data = users));
  }

  select(row) {
    this.modalService.open(UserFormComponent, {
      autoFocus: false,
      data: row,
    });
  }

  create() {
    this.modalService.open(UserFormComponent, {
      autoFocus: false,
    });
  }
}
