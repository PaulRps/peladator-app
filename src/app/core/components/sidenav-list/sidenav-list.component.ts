import { Token } from './../../../shared/models/token.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RoleEnum } from 'src/app/shared/models/role.enum';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  currentUser: Token;

  constructor(private authService: AuthService) {
    this.authService.tokenObservable.subscribe(user => (this.currentUser = user));
  }

  ngOnInit() {}

  public onSidenavClose() {
    this.sidenavClose.emit();
  }

  public isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === RoleEnum.ROLE_ADMIN;
  }
}
