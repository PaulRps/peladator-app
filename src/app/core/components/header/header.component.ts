import { AuthService } from 'src/app/core/services/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  isLogged: any;

  constructor(private authService: AuthService) {
    this.authService.tokenObservable.subscribe(isLogged => (this.isLogged = isLogged));
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
